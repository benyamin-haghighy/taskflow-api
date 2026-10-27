import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { ProjectsModule } from './projects/projects.module';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [TypeOrmModule.forRoot({
    host:'localhost',
    port:5432,
    username:"benyamin",
    password:"",
    type:"postgres",
    database:"myproject",
    autoLoadEntities:true,
    synchronize:true
  }),ProjectsModule, TasksModule]
})
export class AppModule {}
