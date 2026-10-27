import { IsEnum, IsInt, IsNotEmpty, IsOptional } from "class-validator";
import { StatusProject } from "../enums/statusEnum";

export class pageNation{
    @IsInt()
    page:number
    @IsInt()
    limit:number
}