import { Args, Mutation, Query, Resolver, Subscription } from "@nestjs/graphql";
import { Schema as MongooseSchema } from 'mongoose';

import { Hobby } from './hobby.model';
import { HobbyService } from './hobby.service';
import { CreateHobbyDto, ListHobbyDto, UpdateHobbyDto } from './hobby.dto';
import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub();

@Resolver(() => Hobby)
export class HobbyResolver {
  constructor(private hobbyService: HobbyService) {}

  @Query(() => Hobby)
  async hobby(
    @Args('_id', { type: () => String }) _id: MongooseSchema.Types.ObjectId,
  ) {
    return this.hobbyService.getById(_id);
  }

  @Query(() => [Hobby])
  async hobbies(@Args('filters', { nullable: true }) filters?: ListHobbyDto) {
    return this.hobbyService.list(filters);
  }

  @Mutation(() => Hobby)
  async createHobby(@Args('payload') payload: CreateHobbyDto) {
    const hobby = this.hobbyService.create(payload);
    pubSub.publish('hobbyAdded', { hobbyAdded: hobby });
    return hobby;
  }

  @Mutation(() => Hobby)
  async updateHobby(@Args('payload') payload: UpdateHobbyDto) {
    return this.hobbyService.update(payload);
  }

  @Mutation(() => Hobby)
  async deleteHobby(
    @Args('_id', { type: () => String }) _id: MongooseSchema.Types.ObjectId,
  ) {
    return this.hobbyService.delete(_id);
  }

  @Subscription((returns) => Hobby)
  hobbyAdded() {
    return pubSub.asyncIterator('hobbyAdded');
  }
}
