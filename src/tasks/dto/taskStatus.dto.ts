import { IsEnum, IsNotEmpty } from "class-validator";
import StatusTasks from "../enums/statusEnum";


export class taskStatus{
    @IsNotEmpty()
    @IsEnum(StatusTasks)
    status:StatusTasks
}