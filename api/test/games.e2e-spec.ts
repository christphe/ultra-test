import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import {
  ClassSerializerInterceptor,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { GamesModule } from '../src/games/games.module';
import { GamesService } from '../src/games/games.service';
import { createGame } from './data/game';
import { GamesController } from '../src/games/games.controller';
import { Reflector } from '@nestjs/core';
import { DateTime } from 'luxon';

describe('Games', () => {
  let app: INestApplication;
  const gamesService: GamesService = (<any>{
    findAll: async () => [
      createGame({ id: 1, releaseDate: new Date('2021-07-01T10:24:38.914Z') }),
      createGame({ id: 2, releaseDate: new Date('2021-07-01T10:24:38.914Z') }),
    ],
    create: async (game) => game,
  }) as GamesService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [GamesController],
      providers: [GamesService],
    })
      .overrideProvider(GamesService)
      .useValue(gamesService)
      .compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalInterceptors(
      new ClassSerializerInterceptor(app.get(Reflector)),
    );

    await app.init();
  });

  describe('/GET', () => {
    it(`/GET games`, async () => {
      const data = await (
        await gamesService.findAll()
      ).map((item) => ({
        ...item,
        releaseDate: item.releaseDate.toISOString(),
      }));
      return request(app.getHttpServer())
        .get('/games')
        .expect(200)
        .expect(data);
    });
  });

  describe('/POST', () => {
    it('should create game without id"', async () => {
      const game = createGame();
      delete game.id;
      return request(app.getHttpServer())
        .post('/games')
        .send(game)
        .expect(201)
        .expect({ ...game, releaseDate: game.releaseDate.toISOString() });
    });
    it('should not create game without title"', async () => {
      const game = createGame({ title: '' });
      delete game.id;
      return request(app.getHttpServer()).post('/games').send(game).expect(400);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
