import { Schema as MongooseSchema } from 'mongoose';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateHobbyDto {
  @Field(() => String)
  name: string;
}

@InputType()
export class ListHobbyDto {
  @Field(() => String, { nullable: true })
  _id?: MongooseSchema.Types.ObjectId;

  @Field(() => String, { nullable: true })
  name?: string;
}

@InputType()
export class UpdateHobbyDto {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String, { nullable: true })
  name?: string;
}
