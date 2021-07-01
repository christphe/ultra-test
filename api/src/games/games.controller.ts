import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Publisher } from 'src/publisher/publisher.entity';
import { DeleteResult } from 'typeorm';
import { Game } from './game.entity';
import { GamesService } from './games.service';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Get()
  async findAll(): Promise<Game[]> {
    return this.gamesService.findAll();
  }

  @Post()
  async create(@Body() game: Game): Promise<Game> {
    return this.gamesService.create(game);
  }

  @Put()
  async update(@Body() game: Game): Promise<Game> {
    return this.gamesService.update(game);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<DeleteResult> {
    return this.gamesService.remove(id);
  }

  @Get(':id')
  async getGame(@Param('id') id: number): Promise<Game> {
    return this.gamesService.findOne(id);
  }

  @Get(':id/publisher')
  async getGamePublisher(@Param('id') id: number): Promise<Publisher> {
    return this.gamesService.getPublisher(id);
  }

  @Post('clean')
  async cleanGames() {
    return this.gamesService.cleanGames();
  }
}
