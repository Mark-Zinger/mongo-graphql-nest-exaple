import { Schema as MongooseSchema } from 'mongoose';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreatePersonDto {
  @Field(() => String)
  name: string;

  @Field(() => [String])
  hobbies: MongooseSchema.Types.ObjectId[];
}

@InputType()
export class ListPersonDto {
  @Field(() => String, { nullable: true })
  _id?: MongooseSchema.Types.ObjectId;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => [String], { nullable: true })
  hobbies?: MongooseSchema.Types.ObjectId[];
}

@InputType()
export class UpdatePersonDto {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => [String], { nullable: true })
  hobbies?: MongooseSchema.Types.ObjectId[];
}
