import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class FolderEntity {
  id: number;
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  title: string;
  hide: boolean;
  createdAt: Date;
  updatedAt: Date;
}
