import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Publisher } from 'src/publisher/publisher.entity';
import { DeleteResult, Repository } from 'typeorm';
import { Game } from './game.entity';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(Game)
    private gamesRepository: Repository<Game>,
  ) {}

  create(game: Game): Promise<Game> {
    return this.gamesRepository.save(game);
  }

  findAll(): Promise<Game[]> {
    return this.gamesRepository.find();
  }

  findOne(id: number): Promise<Game> {
    return this.gamesRepository.findOne(id);
  }

  remove(id: number): Promise<DeleteResult> {
    return this.gamesRepository.delete(id);
  }

  update(game: Game): Promise<Game> {
    return this.gamesRepository.save(game);
  }

  getPublisher(id: number): Promise<Publisher> {
    console.log(id);
    return this.gamesRepository
      .createQueryBuilder('game')
      .innerJoinAndSelect('game.publisher', 'publisher')
      .where('game.id = :id', { id })
      .getOne()
      .then((game) => game.publisher);
  }
}
