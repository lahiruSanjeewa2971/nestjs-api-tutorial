import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { BookmarkDto } from './dto';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/auth/decorator/roles.decorator';

@Controller('bookmark')
export class BookmarkController {
  constructor(private bookmarkService: BookmarkService) {}

  @UseGuards(JwtGuard, RolesGuard)
  @Roles('admin')
  @Post('create')
  addBookmark(@GetUser('id') userId: number, @Body() dto: BookmarkDto) {
    return this.bookmarkService.addNewBookmark(userId, dto);
  }
}
