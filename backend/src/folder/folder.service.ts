import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateFolderDto } from './dto/create-folder.dto';
import { UpdateFolderDto } from './dto/update-folder.dto';

@Injectable()
export class FolderService {
  constructor(private prismaService: PrismaService) {
  }
  create(createFolderDto: CreateFolderDto) {
    return this.prismaService.folder.create({data: createFolderDto})
  }

  findAll() {
      return this.prismaService.folder.findMany({include: {uploadedFile: true}})
  }


  findOneByName(title: string) {
    return this.prismaService.folder.findUnique({
      where: {title},
      include: {uploadedFile: true}
    })
  }

  update(title: string, updateFolderDto: UpdateFolderDto) {
    return this.prismaService.folder.update({where: {title}, data: updateFolderDto})
  }

  remove(title: string) {
    return this.prismaService.folder.delete({where: {title}})
  }
}
