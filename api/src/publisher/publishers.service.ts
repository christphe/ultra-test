import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Publisher } from './publisher.entity';

@Injectable()
export class PublishersService {
  constructor(
    @InjectRepository(Publisher)
    private publishersRepository: Repository<Publisher>,
  ) {}

  create(publisher: Publisher): Promise<Publisher> {
    return this.publishersRepository.save(publisher);
  }

  findAll(): Promise<Publisher[]> {
    return this.publishersRepository.find();
  }

  findOne(id: number): Promise<Publisher> {
    return this.publishersRepository.findOne(id);
  }

  remove(id: number): Promise<DeleteResult> {
    return this.publishersRepository.delete(id);
  }

  update(publisher: Publisher): Promise<Publisher> {
    return this.publishersRepository.save(publisher);
  }
}
