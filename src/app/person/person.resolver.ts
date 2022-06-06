import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';

import { Person, PersonDocument } from './person.model';
import { PersonService } from './person.service';
import { CreatePersonDto, ListPersonDto, UpdatePersonDto } from './person.dto';
import { Hobby } from '../hobby/hobby.model';



@Resolver(() => Person)
export class PersonResolver {
  constructor(private personService: PersonService) {}

  @Query(() => Person)
  async person(
    @Args('_id', { type: () => String }) _id: MongooseSchema.Types.ObjectId,
  ) {
    return this.personService.getById(_id);
  }

  @Query(() => [Person])
  async persons(@Args('filters', { nullable: true }) filters?: ListPersonDto) {
    return this.personService.list(filters);
  }

  @Mutation(() => Person)
  async createPerson(@Args('payload') payload: CreatePersonDto) {
    return this.personService.create(payload);
  }

  @Mutation(() => Person)
  async updatePerson(@Args('payload') payload: UpdatePersonDto) {
    return this.personService.update(payload);
  }

  @Mutation(() => Person)
  async deletePerson(
    @Args('_id', { type: () => String }) _id: MongooseSchema.Types.ObjectId,
  ) {
    return this.personService.delete(_id);
  }

  @ResolveField()
  async hobbies(
    @Parent() person: PersonDocument,
    @Args('populate') populate: boolean,
  ) {
    if (populate) await person.populate({ path: 'hobbies', model: Hobby.name });

    return person.hobbies;
  }
}
