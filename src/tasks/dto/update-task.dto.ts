import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateTaskDto extends OmitType(CreateTaskDto,["title"] as const) {
    @IsString()
    @IsOptional()
    @MinLength(3)
    title:string
}
