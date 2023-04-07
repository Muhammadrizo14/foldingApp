import { Injectable } from '@nestjs/common';
import { port } from './main';

export type Rout = {
  title: string,
  url: string
}


@Injectable()
export class AppService {
  getHello(): Rout[] {
    const router: Rout[] = [
      {
        title: 'Folder',
        url: `http://localhost:${port}/folder`
      },
      {
        title: 'File',
        url: `http://localhost:${port}/file`
      },
    ] 
    return router;
  }
}
