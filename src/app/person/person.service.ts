import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';

import { Person, PersonDocument } from './person.model';
import { CreatePersonDto, ListPersonDto, UpdatePersonDto } from './person.dto';

@Injectable()
export class PersonService {
  constructor(
    @InjectModel(Person.name) private personModel: Model<PersonDocument>,
  ) {}

  create(payload: CreatePersonDto) {
    const createdPerson = new this.personModel(payload);
    return createdPerson.save();
  }

  getById(_id: MongooseSchema.Types.ObjectId) {
    return this.personModel.findById(_id).exec();
  }

  list(filters: ListPersonDto) {
    return this.personModel.find({ ...filters }).exec();
  }

  update(payload: UpdatePersonDto) {
    return this.personModel
      .findByIdAndUpdate(payload._id, payload, { new: true })
      .exec();
  }

  delete(_id: MongooseSchema.Types.ObjectId) {
    return this.personModel.findByIdAndDelete(_id).exec();
  }
}
