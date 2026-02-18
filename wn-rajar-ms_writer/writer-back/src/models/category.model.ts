import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Article } from "./article.model.js"

@Entity({ name: "t_categories", schema: "writer" })
export class Category {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", length: 50 })
    title!: string;

    @OneToMany(() => Article, article => article.category)
    articles!: Article[];
}