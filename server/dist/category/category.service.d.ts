import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
export declare class CategoryService {
    private readonly categoryRepository;
    constructor(categoryRepository: Repository<Category>);
    create(createCategoryDto: CreateCategoryDto, id: number): Promise<{
        title: string;
        user: {
            id: number;
        };
    } & Category>;
    findAll(id: number): Promise<Category[]>;
    findOne(categoryId: number): Promise<Category>;
    update(categoryId: number, updateCategoryDto: UpdateCategoryDto): Promise<import("typeorm").UpdateResult>;
    remove(categoryId: number): Promise<import("typeorm").DeleteResult>;
}
