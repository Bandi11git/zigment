import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { NotificationService } from './notification.service';

@Controller('api/notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post('send')
  async sendNotification(@Body() body: any) {
    const { userId, type, channel, content } = body;
    return this.notificationService.sendNotification(userId, type, channel, content);
  }

  @Get(':userId/logs')
  async getNotificationLogs(@Param('userId') userId: string) {
    return this.notificationService.getNotificationLogs(userId);
  }

  @Get('stats')
  async getStats() {
    return this.notificationService.getStats();
  }
}
