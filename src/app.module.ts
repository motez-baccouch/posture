import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from '@adminjs/nestjs'
import { UserService } from './user/user.service';
import { RendezVousModule } from './rendez-vous/rendez-vous.module';
import { KineModule } from './kine/kine.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentModule } from './payment/payment.module';
import { Database, Resource } from '@adminjs/typeorm'
import AdminJS from 'adminjs';
import { UserModule } from './user/user.module'
import { User } from './user/entities/user.entity';
import { Kine } from './kine/entities/kine.entity';
import { RendezVous } from './rendez-vous/entities/rendez-vous.entity';
import { MulterModule } from '@nestjs/platform-express';

AdminJS.registerAdapter({ Database, Resource })

@Module({
  imports: [MulterModule.register({
    dest: './UploadedFiles/images'
  }),
    AdminModule.createAdmin({
    adminJsOptions: {
      rootPath: '/admin',
      resources: [
        {
          resource: User,
          options: {
            listProperties: [  "email", "prenom" , "nom" , "numero","role"]  // Array with the properties
             }
          }
        ,Kine,RendezVous],
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

    ConfigModule.forRoot({
      isGlobal: true,
    }),
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
      synchronize: true,// to remove after deployement
    }),
    PaymentModule,
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
