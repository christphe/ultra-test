import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { Publisher } from '../publisher/publisher.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @Column()
  @ApiProperty()
  @IsNotEmpty()
  price: number;

  @Exclude({ toPlainOnly: true })
  @Column({ default: false })
  discounted: boolean;

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
  @IsNotEmpty()
  releaseDate: Date;
}
