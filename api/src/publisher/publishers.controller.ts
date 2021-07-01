import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { Publisher } from './publisher.entity';
import { PublishersService } from './publishers.service';

@Controller('publishers')
export class PublishersController {
  constructor(private readonly publishersService: PublishersService) {}

  @Get()
  async findAll(): Promise<Publisher[]> {
    return this.publishersService.findAll();
  }

  @Post()
  async create(@Body() publisher: Publisher): Promise<Publisher> {
    return this.publishersService.create(publisher);
  }

  @Put()
  async update(@Body() publisher: Publisher): Promise<Publisher> {
    return this.publishersService.update(publisher);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<DeleteResult> {
    return this.publishersService.remove(id).catch((error) => error);
  }

  @Get(':id')
  async getGame(@Param('id') id: number): Promise<Publisher> {
    return this.publishersService.findOne(id);
  }
}
