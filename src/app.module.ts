import { Module } from '@nestjs/common';
import { AuthController } from '@/controllers/auth/auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel, UserSchema } from './models/user.model';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URL),
    MongooseModule.forFeatureAsync([
      {
        name: UserModel.name,
        useFactory: () => UserSchema,
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [],
})
export class AppModule {}
