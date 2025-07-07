import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export default (): PostgresConnectionOptions => ({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  port: 5432,
  entities: [],

  synchronize: false,
});
