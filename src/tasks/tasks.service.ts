import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { Project } from '../projects/entities/project.entity';
import { taskStatus } from './dto/taskStatus.dto';
import StatusTasks from './enums/statusEnum';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository:Repository<Task>,
    @InjectRepository(Project)
    private readonly projectRepository:Repository<Project>
  ){}
  async create(createTaskDto: CreateTaskDto):Promise<Task> {
    const isProject = await this.projectRepository.findOneBy({id:createTaskDto.project_id})
    if (!isProject) {
      throw new NotFoundException("پروژه ای با این ایدی پیدا نشدش")
    }
    const task = this.taskRepository.create(createTaskDto)
    return this.taskRepository.save(task)
    
  }

  findAll(page:number,limit:number) { 
    return this.taskRepository.find({relations:{
      project:true,
    },
  skip:(page-1)*limit,
  take:limit,
  order:{"id":"desc"}
})
  }
  getAllWithStatus(page:number,limit:number, status:StatusTasks){
    return this.taskRepository.find({
      where:{status},
      relations:{
       project:true,
      },
      skip:(page-1)*limit,
      take:limit,
      order:{"id":"desc"}
      })
    }
  async findOne(id: number):Promise<Task> {
    const task = await this.taskRepository.findOne({where:{id}, relations:{project:true}})
    if (!task) {
      throw new NotFoundException('تسکی با این ایدی یپیدا نشد')
    }

    return task
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    if (updateTaskDto.project_id) {
      const isProject = await this.projectRepository.findOne({
        where:{
          id:updateTaskDto.project_id
        }
      })
      if (!isProject) {
        throw new NotFoundException('پروژه ای با این ایدی پیدا نشدش')
      }
    }
    const task = await this.taskRepository.update(id, updateTaskDto)
    if (task.affected === 0) {
      throw new NotFoundException('تسکی با این ایدی یپیدا نشد')
    }
    const newTask = await this.taskRepository.findOne({where:{id}})
    return newTask
  }

  async remove(id: number):Promise<void> {
    const task = await this.taskRepository.delete(id)
    if (task.affected === 0) {
      throw new NotFoundException('تسکی با این ایدی یپیدا نشد')
    }
  }
}
