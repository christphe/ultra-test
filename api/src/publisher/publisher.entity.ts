import { ApiProperty } from '@nestjs/swagger';
import { Game } from 'src/games/game.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Publisher {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  name: string;

  @OneToMany(() => Game, (game) => game.publisher)
  @ApiProperty()
  games: Game[];

  @Column()
  @ApiProperty()
  siret: number;

  @Column()
  @ApiProperty()
  phone: string;
}
