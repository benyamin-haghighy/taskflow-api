import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, Query, DefaultValuePipe, ParseIntPipe, ParseEnumPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import type { Response } from 'express';
import { taskStatus } from './dto/taskStatus.dto';
import StatusTasks from './enums/statusEnum';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(@Res() res:Response,@Body() createTaskDto: CreateTaskDto) {
    return res.status(HttpStatus.CREATED).json({
      statusCode:201,
      data:await this.tasksService.create(createTaskDto),
      message:"task create successFully"
    })
  }

  @Get()
  async findAll(@Res() res:Response,@Query('page', new DefaultValuePipe(1), ParseIntPipe) page:number, @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit:number) {
    const tasks= await this.tasksService.findAll(page, limit)
    return res.status(HttpStatus.OK).json({
      statusCode:200,
      data:{
        pageNation:{
          page,
        limit,
        countTasks:tasks.length,
        countPage:Math.ceil(tasks.length/limit)
      },
        tasks,
    }});
  }
  @Get('/status/:status')
  async getAllWithStatus(@Res() res:Response,@Param('status', new ParseEnumPipe(StatusTasks)) param:StatusTasks,@Query('page', new DefaultValuePipe(1), ParseIntPipe) page:number, @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit:number){
    const tasks= await this.tasksService.getAllWithStatus(page, limit,param)
    return res.status(HttpStatus.OK).json({
      statusCode:200,
      data:{
        pageNation:{
          page,
        limit,
        count:tasks.length,
        countPage:Math.ceil(tasks.length/limit)
      },
        tasks,
    }});
  }
  @Get(':id')
  async findOne(@Res() res:Response,@Param('id') id: string) {
    return  res.status(HttpStatus.OK).json({
      statusCode:200,
      data:await this.tasksService.findOne(+id)
    })
  }

  @Patch(':id')
  async update(@Res() res:Response,@Param('id', ParseIntPipe) id: number, @Body() updateTaskDto: UpdateTaskDto) {
    return res.status(HttpStatus.OK).json({
      statusCode:200,
      data:await this.tasksService.update(id, updateTaskDto),
      message:"task update successFully"
    })
  }

  @Delete(':id')
  async remove(@Res() res:Response,@Param('id', ParseIntPipe) id: number) {
    await this.tasksService.remove(id)
    return res.status(HttpStatus.OK).json({
      statusCode:200,
      message:"task remove successFully"
    })
  }
}
