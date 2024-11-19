import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserPreference } from './user-preference.model';
import { CreateUserPreferenceDto } from './dto/create-user-preference.dto';

@Injectable()
export class UserPreferenceService {
  constructor(
    @InjectModel(UserPreference.name) private userPrefModel: Model<UserPreference>,
  ) {}

  async create(createUserPrefDto: CreateUserPreferenceDto): Promise<UserPreference> {
    const createdUserPref = new this.userPrefModel(createUserPrefDto);
    return createdUserPref.save();
  }

  async findOne(userId: string): Promise<UserPreference | null> {
    return this.userPrefModel.findOne({ userId }).exec();
  }

  async update(userId: string, updateUserPrefDto: Partial<CreateUserPreferenceDto>): Promise<UserPreference | null> {
    return this.userPrefModel.findOneAndUpdate({ userId }, updateUserPrefDto, { new: true }).exec();
  }

  async delete(userId: string): Promise<void> {
    await this.userPrefModel.deleteOne({ userId }).exec();
  }
}
