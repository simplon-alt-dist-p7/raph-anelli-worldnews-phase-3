import { AppDataSource } from "../config/database.js";
import { Article } from "../models/article.model.js";
import { Repository } from "typeorm";
import type { CreateArticleDTO } from "../types/article.types.js";

class ArticleRepository {
  private repository: Repository<Article>;

  constructor() {
    this.repository = AppDataSource.getRepository(Article);
  }

  async findById(id: number): Promise<Article | null> {
    return await this.repository.findOne({ 
      where : {id},
      relations : ["category"],
      withDeleted: true,
     });
  }

  async findByTitle(title: string): Promise<Article | null> {
    return await this.repository.findOneBy({ title });
  }

  async create(data: CreateArticleDTO): Promise<Article> {
    // const article = this.repository.create(data);
    const article = this.repository.create({
      title: data.title,
      subtitle: data.subtitle,
      subhead: data.subhead,
      body: data.body,
      category: { id: data.categoryId },
    });
    const savedArticle = await this.repository.save(article);
    return await this.repository.findOne({ 
      where : {id : savedArticle.id},
      relations : ["category"],
      withDeleted: true,
     }) as Article;
  }

  async update(id: number, data: Partial<Article>): Promise<Article | null> {
    const { update_date, category, ...otherData } = data;

    const updateData: any = {
      ...otherData,
      update_date: () => "CURRENT_TIMESTAMP"
    };

    // Gère la catégorie : transforme { id: X } en category_id
    if (category && (category as any).id) {
      updateData.category = { id: (category as any).id };
    }

    await this.repository
      .createQueryBuilder()
      .update(Article)
      .set(updateData)
      .where("id = :id", { id })
      .execute();

    return await this.repository.findOne({
      where: { id },
      relations: ["category"],
      withDeleted: true,
    });
  }

  async softDelete(id:number){
    await this.repository.softDelete(id);
  }

  async restore(id:number){
    await this.repository.restore(id);
  }
}

export const articleRepository = new ArticleRepository();
