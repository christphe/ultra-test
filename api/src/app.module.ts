import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GamesModule } from './games/games.module';
import { PublishersModule } from './publisher/publishers.module';

const env = process.env.NODE_ENV || 'development';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: env !== 'production' ? 'localhost' : 'sql',
      port: 3306,
      username: 'root',
      password: 'ultra@password',
      database: 'ultra',
      autoLoadEntities: true,
      synchronize: true,
    }),
    GamesModule,
    PublishersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
