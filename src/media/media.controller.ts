import {
  Controller,
  Post,
  HttpCode,
  UseInterceptors,
  UploadedFile,
  Query,
} from '@nestjs/common';
import { MediaService } from './media.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Public } from 'src/auth/decorators';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @HttpCode(200)
  @Post()
  @Public()
  @UseInterceptors(FileInterceptor('media'))
  async uploadFile(
    @UploadedFile() mediaFile: Express.Multer.File,
    @Query('folder') folder?: string,
    @Query('id') id?: number,
  ) {
    console.log(mediaFile, folder, id);
    return this.mediaService.saveMedia(mediaFile, folder, id);
  }
}
