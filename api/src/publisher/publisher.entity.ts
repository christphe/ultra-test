import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Game } from '../games/game.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Publisher {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @OneToMany(() => Game, (game) => game.publisher, { onDelete: 'CASCADE' })
  @ApiProperty()
  games: Game[];

  @Column()
  @ApiProperty()
  @IsNotEmpty()
  siret: number;

  @Column()
  @ApiProperty()
  @IsNotEmpty()
  phone: string;
}
