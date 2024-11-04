import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('api') // makes it localhost:3001/api/...
  app.enableCors()
  await app.listen(3001)
}
bootstrap()
