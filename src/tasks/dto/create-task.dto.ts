import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Min, MinLength } from "class-validator"
import StatusTasks from "../enums/statusEnum"

export class CreateTaskDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    title:string
    @IsString()
    @IsOptional()
    descryption:string
    @IsOptional()
    @IsEnum(StatusTasks)
    status:StatusTasks
    @IsNotEmpty()
    @IsInt()
    @Min(1)
    project_id:number
}
