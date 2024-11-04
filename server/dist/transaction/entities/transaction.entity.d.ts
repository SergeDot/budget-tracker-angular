import { Category } from 'src/category/entities/category.entity';
import { User } from 'src/user/entities/user.entity';
export declare class Transaction {
    id: number;
    title: string;
    type: string;
    amount: number;
    user: User;
    category: Category;
    createdAt: Date;
    updatedAt: Date;
}
