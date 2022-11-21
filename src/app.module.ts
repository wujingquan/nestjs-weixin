import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongoHighlighter } from '@mikro-orm/mongo-highlighter';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Example } from './entities/Example';
import { WeixinModule } from './weixin/weixin.module';

@Module({
  imports: [
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule.forRoot()],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        // const clientUrl = `mongodb://${config.get('DB_USERNAME')}:${config.get(
        //   'DB_PASSWORD',
        // )}@${config.get('DB_HOST')}:${config.get('DB_PORT')}/${config.get(
        //   'DB_NAME',
        // )}`;
        const clientUrl = config.get('clientUrl');
        console.log(clientUrl);
        return {
          strict: true,
          type: 'mongo',
          clientUrl,
          entities: ['./dist/entities'],
          entitiesTs: ['./src/entities'],
          debug: Boolean(config.get('DB_DEBUG')),
          highlighter: new MongoHighlighter(),
        };
      },
    }),
    MikroOrmModule.forFeature([Example]),
    WeixinModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
