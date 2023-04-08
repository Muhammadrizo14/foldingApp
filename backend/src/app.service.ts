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
        title: 'Для получения папок',
        url: `http://localhost:${port}/folder`
      },
      {
        title: 'Для получения файлов',
        url: `http://localhost:${port}/upload`
      },
    ] 
    return router;
  }
}
