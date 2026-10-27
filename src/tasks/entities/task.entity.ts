import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import StatusTasks from "../enums/statusEnum";
import { Project } from "../../projects/entities/project.entity";

@Entity({name:"tasks"})
export class Task {
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    title:string
    @Column({nullable:true})
    descryption:string
    @Column({type:"enum", enum:StatusTasks, default:StatusTasks.SET})
    status:StatusTasks
    @Column()
    project_id:number
    @ManyToOne(()=>Project, (project)=>project.tasks)
    @JoinColumn({name:"project_id"})
    project:Project
}
