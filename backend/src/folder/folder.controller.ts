import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FolderService } from './folder.service';
import { CreateFolderDto } from './dto/create-folder.dto';
import { UpdateFolderDto } from './dto/update-folder.dto';

@Controller('folder')
export class FolderController {
  constructor(private readonly folderService: FolderService) {}

  @Post()
  create(@Body() createFolderDto: CreateFolderDto) {
    return this.folderService.create(createFolderDto);
  }

  @Get()
  findAll() {
    return this.folderService.findAll();
  }

  @Get(':title')
  findOneByName(@Param('title') title: string) {
    return this.folderService.findOneByName(title);
  }

  @Patch(':title')
  update(@Param('title') title: string, @Body() updateFolderDto: UpdateFolderDto) {
    return this.folderService.update(title, updateFolderDto);
  }

  @Delete(':title')
  remove(@Param('title') title: string) {
    return this.folderService.remove(title);
  }
}
