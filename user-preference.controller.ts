import { Controller, Post, Get, Patch, Delete, Param, Body } from '@nestjs/common';
import { UserPreferenceService } from './user-preference.service';
import { CreateUserPreferenceDto } from './dto/create-user-preference.dto';

@Controller('api/preferences')
export class UserPreferenceController {
  constructor(private readonly userPrefService: UserPreferenceService) {}

  @Post()
  async create(@Body() createUserPrefDto: CreateUserPreferenceDto) {
    return this.userPrefService.create(createUserPrefDto);
  }

  @Get(':userId')
  async get(@Param('userId') userId: string) {
    return this.userPrefService.findOne(userId);
  }

  @Patch(':userId')
  async update(@Param('userId') userId: string, @Body() updateUserPrefDto: Partial<CreateUserPreferenceDto>) {
    return this.userPrefService.update(userId, updateUserPrefDto);
  }

  @Delete(':userId')
  async delete(@Param('userId') userId: string) {
    return this.userPrefService.delete(userId);
  }
}
