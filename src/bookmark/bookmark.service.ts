import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { BookmarkDto } from './dto';

@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) {}

  async addNewBookmark(userId: number, dto: BookmarkDto) {
    try {
      const newBookmark = await this.prisma.bookmark.create({
        data: {
          ...dto,
          userId,
        },
      });

      return newBookmark;
    } catch (error) {
      console.log('add new bookmark error :', error);
      throw error;
    }
  }
}
