import { DataSource } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { TodoEntity, UserEntity } from "../entities";
import { Env } from "../env";

export const AppDataSource = new DataSource({
  type: "mysql",
  database: Env.dbName,
  host: Env.host,
  username: Env.username,
  password: Env.password,
  port: Env.dbPort,
  logging: false,
  synchronize: true, // Use only in development, not in production
  entities: [UserEntity, TodoEntity],
  entitySkipConstructor: true,
  namingStrategy: new SnakeNamingStrategy(),
});
