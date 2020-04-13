import { knex } from '@gqlapp/database-server-ts';

export default class Player {
  public players() {
    return knex.select();
  }
}
