import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import { Session } from './entitys/session.entity';
import { getConnection } from 'typeorm';
import { TypeormStore } from 'typeorm-store';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`
    }),
    TypeOrmModule.forRoot(),
    ProductsModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {
  constructor(private configService: ConfigService) {}

  configure(consumer: MiddlewareConsumer) {
    // const repository = getConnection().getRepository();

    consumer
      .apply(
        // session({
        //   saveUninitialized: true,
        //   secret: 'stsdf',
        //   resave: false,
        //   cookie: {
        //     maxAge: 1000 * 60 * 60 * 2
        //   }
        // }),
        cookieParser()
      )
      .forRoutes('*');
  }
}
