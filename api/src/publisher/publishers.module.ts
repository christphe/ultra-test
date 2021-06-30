import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Publisher } from './publisher.entity';
import { PublishersController } from './publishers.controller';
import { PublishersService } from './publishers.service';

@Module({
  imports: [TypeOrmModule.forFeature([Publisher])],
  providers: [PublishersService],
  controllers: [PublishersController],
})
export class PublishersModule {}
