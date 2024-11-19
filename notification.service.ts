import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotificationLog } from './notification-log.model';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(NotificationLog.name) private notificationLogModel: Model<NotificationLog>,
  ) {}

  async sendNotification(userId: string, type: string, channel: string, content: object): Promise<NotificationLog> {
    const log = new this.notificationLogModel({
      userId,
      type,
      channel,
      status: 'pending',
      metadata: content,
    });

    return log.save();
  }

  async getNotificationLogs(userId: string): Promise<NotificationLog[]> {
    return this.notificationLogModel.find({ userId }).exec();
  }

  async getStats(): Promise<any> {
    // Aggregate stats (e.g., count notifications per type/channel)
    return this.notificationLogModel.aggregate([
      { $group: { _id: '$type', count: { $sum: 1 } } },
    ]);
  }
}
