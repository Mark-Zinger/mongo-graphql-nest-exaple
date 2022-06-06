import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';

import { Hobby, HobbyDocument } from './hobby.model';
import { CreateHobbyDto, ListHobbyDto, UpdateHobbyDto } from './hobby.dto';

@Injectable()
export class HobbyService {
  constructor(
    @InjectModel(Hobby.name) private hobbyModel: Model<HobbyDocument>,
  ) {}

  create(payload: CreateHobbyDto) {
    const createdHobby = new this.hobbyModel(payload);
    return createdHobby.save();
  }

  getById(_id: MongooseSchema.Types.ObjectId) {
    return this.hobbyModel.findById(_id).exec();
  }

  list(filters: ListHobbyDto) {
    return this.hobbyModel.find({ ...filters }).exec();
  }

  update(payload: UpdateHobbyDto) {
    return this.hobbyModel
      .findByIdAndUpdate(payload._id, payload, { new: true })
      .exec();
  }

  delete(_id: MongooseSchema.Types.ObjectId) {
    return this.hobbyModel.findByIdAndDelete(_id).exec();
  }
}
