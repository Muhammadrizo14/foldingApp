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

  findOne(id: number) {
    return this.prismaService.folder.findUnique({
      where: {id},
      include: {uploadedFile: true}
    })
  }

  update(id: number, updateFolderDto: UpdateFolderDto) {
    return this.prismaService.folder.update({where: {id}, data: updateFolderDto})
  }

  remove(id: number) {
    return this.prismaService.folder.delete({where: {id}})
  }
}
