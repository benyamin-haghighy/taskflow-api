import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { StatusProject } from "../enums/statusEnum";
import { Task } from "../../tasks/entities/task.entity";

@Entity({name:"projects"})
export class Project {
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    name:string
    @Column({
        type:"enum",
        enum:StatusProject,
        default:StatusProject.ENABLE
    })
    status:StatusProject
    @OneToMany(()=>Task, (task)=>task.project)
    tasks:Task[]
}
