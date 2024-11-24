import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
// import { UsersModule } from "./users/users.module";
import { join } from "path";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.DB_HOST || "mysql_db",
      port: parseInt(process.env.DB_PORT, 10) || 3306,
      username: process.env.DB_USERNAME || "root",
      password: process.env.DB_PASSWORD || "root",
      database: process.env.DB_DATABASE || "test",
      autoLoadEntities: true,
      entities: [join(__dirname, "**", "*.entity{.ts,.js}")],
      synchronize: true,
      dropSchema: true,
    }),
    UsersModule,
  ],
})
export class AppModule {}
