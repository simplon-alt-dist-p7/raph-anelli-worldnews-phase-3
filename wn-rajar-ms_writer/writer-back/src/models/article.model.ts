import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, DeleteDateColumn, Unique } from "typeorm";
import { Category } from "./category.model.js";

@Entity({ name: "t_articles", schema: "writer" })
@Unique(["title", "publish_date"])
export class Article {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 300 })
  title!: string;

  @Column({ type: "varchar", length: 300 })
  subtitle!: string;

  @Column({ type: "varchar", length: 1000 })
  subhead!: string;

  @Column({ type: "text" })
  body!: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  publish_date!: Date;

  @Column({ type: "timestamp", nullable: true, default: null })
  update_date!: Date | null;

  @DeleteDateColumn({ name: "delete_date" })
  deletedAt!: Date | null;

  @ManyToOne(() => Category, (category) => category.articles, {
    nullable: false,
  })
  @JoinColumn({ name: "category_id" })
  category!: Category;
}

