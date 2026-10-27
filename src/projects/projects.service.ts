import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Equal, In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { StatusProject } from './enums/statusEnum';
import { pageNation } from './dto/pageNation-project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository:Repository<Project>
  ){}
  create(createProjectDto: CreateProjectDto):Promise<Project> {
    const project = this.projectRepository.create(createProjectDto)
    return this.projectRepository.save(project)
  }
  async findAll(pageNation:pageNation,status?:StatusProject):Promise<{ countProjects: number; projects: Project[] }>{
    const countProjects = await this.projectRepository.find()
    if (status) {
      return {
        countProjects:countProjects.length,
        projects: await this.projectRepository.find({
      where:{
        status
      },
      relations:{
        tasks:true
      },
      select:{
        id:true,
        name:true,
        status:true,
        tasks:{
          title:true
        }
      },
      order:{id:"desc"},
      skip:(pageNation.page - 1) * pageNation.limit,
      take:pageNation.limit?pageNation.limit:10,
      
    })
      }
    }
    return {
      countProjects:countProjects.length,
      projects: await this.projectRepository.find({
      relations:{
        tasks:true
      },
      select:{
        id:true,
        name:true,
        status:true,
        tasks:{
          title:true
        }
      },
      order:{id:"desc"},
      skip:(pageNation.page - 1) * pageNation.limit,
      take:pageNation.limit?pageNation.limit:10,
      
    })
    }
    
  }

  async findOne(id: number):Promise<Project> {
    const project = await this.projectRepository.findOne({where:{id}
      ,relations:{
        tasks:true
      }
    })
    if (!project) {
      throw new NotFoundException('پروژه ای با این ایدی پیدا نشدش')
    }
    return project;
  }

  async update(id: number, updateProjectDto: UpdateProjectDto): Promise<Project> {
    const project = await this.projectRepository.findOne({where:{id}})
    if (!project) {
      throw new NotFoundException("پروژه ای با این ایدی پیدا نشدش")
    }
    project.name = updateProjectDto.name
    return this.projectRepository.save(project)
  }

  async remove(id: number) {
    const project = await this.projectRepository.findOneBy({id})
    if (!project) {
      throw new NotFoundException('پروژه ای با این ایدی پیدا نشد')
    }
    await this.projectRepository.delete({id})
    return {message:"project remove successfully", project};
  }
}
