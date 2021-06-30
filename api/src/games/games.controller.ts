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
  findAll(): Promise<Game[]> {
    return this.gamesService.findAll();
  }

  @Post()
  create(@Body() game: Game): Promise<Game> {
    return this.gamesService.create(game);
  }

  @Put()
  update(@Body() game: Game): Promise<Game> {
    return this.gamesService.update(game);
  }

  @Delete()
  delete(id: number): Promise<DeleteResult> {
    return this.gamesService.remove(id);
  }

  @Get(':id')
  getGame(@Param('id') id: number): Promise<Game> {
    return this.gamesService.findOne(id);
  }

  @Get(':id/publisher')
  getGamePublisher(@Param('id') id: number): Promise<Publisher> {
    return this.gamesService.getPublisher(id);
  }
}
