import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from '@adminjs/nestjs';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { RendezVousModule } from './rendez-vous/rendez-vous.module';
import { KineModule } from './kine/kine.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [AdminModule.createAdmin({
    adminJsOptions: {
      rootPath: '/admin',
      resources: [],
    },
    auth: {
      authenticate: async (email, password) => Promise.resolve({ email: 'test' }),
      cookieName: 'test',
      cookiePassword: 'testPass',
    },
  }), 
    UserModule, 
    KineModule, 
    RendezVousModule,

    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: process.env.MONGODB_CONNECTION_STRING,
      database: process.env.MONGODB_DATABASE,
      entities: [
        __dirname + '/**/*.entity{.ts,.js}',
      ],
      ssl: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
      synchronize: true,
    }),
    UserModule,
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
