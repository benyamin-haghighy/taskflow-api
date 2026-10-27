import { IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator"
import { StatusProject } from "../enums/statusEnum";

export class CreateProjectDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    name:string
    @IsOptional()
    @IsEnum(StatusProject)
    status:StatusProject
}
