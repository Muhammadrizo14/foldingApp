import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

export const port = 3001

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();  
  await app.listen(port);
  console.log(`server running on port http://localhost:${port}/`);
}
bootstrap();
