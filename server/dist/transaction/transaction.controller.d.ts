import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
export declare class TransactionController {
    private readonly transactionService;
    constructor(transactionService: TransactionService);
    create(createTransactionDto: CreateTransactionDto, req: any): Promise<{
        title: string;
        amount: number;
        type: "expense" | "income";
        category: {
            id: number;
        };
        user: {
            id: number;
        };
    } & import("./entities/transaction.entity").Transaction>;
    findAllByType(req: any, type: string): Promise<number>;
    findAllWithPagination(req: any, page: string, limit: string): Promise<import("./entities/transaction.entity").Transaction[]>;
    findAll(req: any): Promise<import("./entities/transaction.entity").Transaction[]>;
    findOne(transactionId: string): Promise<import("./entities/transaction.entity").Transaction>;
    update(transactionId: string, updateTransactionDto: UpdateTransactionDto): Promise<import("typeorm").UpdateResult>;
    remove(transactionId: string): Promise<import("typeorm").DeleteResult>;
}
