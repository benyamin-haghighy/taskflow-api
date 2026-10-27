import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Res, HttpStatus } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { StatusProject } from './enums/statusEnum';
import { Project } from './entities/project.entity';
import type { Response } from 'express';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  async create(@Res() res:Response, @Body() createProjectDto: CreateProjectDto) {
    return res.status(HttpStatus.CREATED).json({
      statusCode:HttpStatus.CREATED,
      data:await this.projectsService.create(createProjectDto),
      message:"user create successFully",
    })
    
    
  }
  @Get('/status{/:status}')
  async findAll( @Res() res:Response, @Query('limit') limit:number=10, @Query('page') page:number=1,@Param('status') status?:StatusProject):Promise<object> {
    limit = Number(limit)
    page = Number(page)
    const projects=await this.projectsService.findAll({limit, page},status)
    return res.status(HttpStatus.OK).json({
      statusCode:200,
      data:{
      page,
      limit,
      countPage:Math.ceil(projects.countProjects / limit),
      projects
      
    }
    })
  }
  @Get(':id')
  async findOne(@Res() res:Response, @Param('id') id: string):Promise<Response> {
    return res.status(HttpStatus.OK).json({
      statusCode:200,
      data:await this.projectsService.findOne(+id),
      message:"project find successFully"
    })
  }
  @Patch(':id')
  async update(@Res() res:Response, @Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return res.status(HttpStatus.OK).json({statusCode:200, data: await this.projectsService.update(+id, updateProjectDto),message:"project update successFully"})
  }

  @Delete(':id')
  async remove(@Res() res:Response, @Param('id') id: string):Promise<object> {
    const result = await this.projectsService.remove(+id);
    return res.status(HttpStatus.OK).json({
      statusCode:200,
      data:result.project,
      message:result.message
    })
  }
}
