import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Example } from './entities/Example';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @InjectRepository(Example)
    private readonly exampleRepository: EntityRepository<Example>,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('examples')
  async findAllExample() {
    return await this.exampleRepository.findAll();
  }

  @Get('examples/:id')
  async findOneExample(@Param('id') id) {
    return await this.exampleRepository.findOne({ id });
  }

  @Post('examples')
  async createExample(@Body() body) {
    const example = new Example();
    example.username = body.username;
    example.password = body.password;
    await this.exampleRepository.persistAndFlush(example);
    return example;
  }
}
