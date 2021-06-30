import { ApiProperty } from '@nestjs/swagger';
import { Publisher } from 'src/publisher/publisher.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  title: string;

  @Column()
  @ApiProperty()
  price: number;

  @ManyToOne(() => Publisher, (publisher) => publisher.games, {
    nullable: false,
  })
  @ApiProperty()
  publisher: Publisher;

  @Column()
  @ApiProperty()
  tags: string;

  @Column()
  @ApiProperty()
  releaseDate: Date;
}
