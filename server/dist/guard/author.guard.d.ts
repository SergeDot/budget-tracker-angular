import { CanActivate, ExecutionContext } from '@nestjs/common';
import { CategoryService } from 'src/category/category.service';
import { TransactionService } from 'src/transaction/transaction.service';
export declare class AuthorGuard implements CanActivate {
    private readonly categoryService;
    private readonly transactionService;
    constructor(categoryService: CategoryService, transactionService: TransactionService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
