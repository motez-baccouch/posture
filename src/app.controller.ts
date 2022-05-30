import { Controller, Get, Post, Render, Request, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';
import { JwtAuthGuard } from './user/guards/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('Index')
  getIndex() {}

  @Post('/upload')
  @UseInterceptors(FileInterceptor('image'))
  uploadFile(@UploadedFile() file, @Request() req){
    return file;
  }
}
