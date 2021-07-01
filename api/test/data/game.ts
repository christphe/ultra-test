import { DateTime } from 'luxon';
import { Game } from 'src/games/game.entity';

export function createGame(overrides: Partial<Game> = {}): Game {
  return {
    id: 0,
    discounted: false,
    price: 30,
    publisher: {
      id: 1,
      name: 'myPublisher',
      phone: '+33696638743',
      games: [],
      siret: 123655,
    },
    releaseDate: DateTime.now().toJSDate(),
    tags: '',
    title: 'My Little Game',
    ...overrides,
  };
}
