import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from '@adminjs/nestjs';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { RendezVousModule } from './rendez-vous/rendez-vous.module';
import { KineModule } from './kine/kine.module';
import { KineModule } from './kine/kine.module';
import { RendezVousModule } from './rendez-vous/rendez-vous.module';
import { UserModule } from './user/user.module';

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
  }), UserModule, KineModule, RendezVousModule,
 
],
  controllers: [AppController, UserController],
  providers: [AppService, UserService,],
})
export class AppModule {}
