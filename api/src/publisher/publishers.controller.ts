import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { Publisher } from './publisher.entity';
import { PublishersService } from './publishers.service';

@Controller('publishers')
export class PublishersController {
  constructor(private readonly publishersService: PublishersService) {}

  @Get()
  findAll(): Promise<Publisher[]> {
    return this.publishersService.findAll();
  }

  @Post()
  create(@Body() publisher: Publisher): Promise<Publisher> {
    return this.publishersService.create(publisher);
  }

  @Put()
  update(@Body() publisher: Publisher): Promise<Publisher> {
    return this.publishersService.update(publisher);
  }

  @Delete()
  delete(id: number): Promise<DeleteResult> {
    return this.publishersService.remove(id);
  }
}
