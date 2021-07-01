import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Publisher } from 'src/publisher/publisher.entity';
import { DeleteResult, Repository } from 'typeorm';
import { Game } from './game.entity';
import { DateTime } from 'luxon';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(Game)
    private gamesRepository: Repository<Game>,
  ) {}

  async create(game: Game): Promise<Game> {
    const result = await this.gamesRepository.save(game);
    return this.gamesRepository.create(result);
  }

  async findAll(): Promise<Game[]> {
    return this.gamesRepository.find();
  }

  async findOne(id: number): Promise<Game> {
    return this.gamesRepository.findOne(id);
  }

  async remove(id: number): Promise<DeleteResult> {
    return this.gamesRepository.delete(id);
  }

  async update(game: Game): Promise<Game> {
    const result = await this.gamesRepository.save(game);
    return this.gamesRepository.create(result);
  }

  async getPublisher(id: number): Promise<Publisher> {
    return this.gamesRepository
      .createQueryBuilder('game')
      .innerJoinAndSelect('game.publisher', 'publisher')
      .where('game.id = :id', { id })
      .getOne()
      .then((game) => game.publisher);
  }

  async cleanGames(): Promise<void> {
    // could have used a nest queue here if I had more time
    // and if the clean process took too long
    await Promise.all([
      this.deleteObsoleteGames(),
      this.applyDiscountsToOldGames(),
    ]);
  }

  async deleteObsoleteGames(): Promise<void> {
    const obsoleteDate = DateTime.now().minus({ month: 18 }).toISODate();
    await this.gamesRepository
      .createQueryBuilder()
      .delete()
      .where('discounted = false')
      .andWhere('releaseDate <= :date', { date: obsoleteDate })
      .execute();
  }

  async applyDiscountsToOldGames(): Promise<void> {
    const startDate = DateTime.now().minus({ month: 18 }).toJSDate();
    const endDate = DateTime.now().minus({ month: 12 }).toJSDate();
    await this.gamesRepository
      .createQueryBuilder()
      .update()
      .where('discounted = false')
      .andWhere('releaseDate > :startDate', { startDate: startDate })
      .andWhere('releaseDate < :endDate', { endDate: endDate })
      .andWhere('discounted = 0')
      .set({
        discounted: true,
        price: () => 'price * 0.8',
      })
      .execute();
  }
}
