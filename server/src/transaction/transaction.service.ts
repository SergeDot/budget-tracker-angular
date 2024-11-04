import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { CreateTransactionDto } from './dto/create-transaction.dto'
import { UpdateTransactionDto } from './dto/update-transaction.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Transaction } from './entities/transaction.entity'
import { Repository } from 'typeorm'

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
  ) {}

  async create(createTransactionDto: CreateTransactionDto, id: number) {
    const newTransaction = {
      title: createTransactionDto.title,
      amount: +createTransactionDto.amount,
      type: createTransactionDto.type,
      category: { id: +createTransactionDto.category },
      user: { id },
    }

    if (!newTransaction) throw new BadRequestException('Error...')

    return await this.transactionRepository.save(newTransaction)
  }

  async findAll(id: number) {
    return await this.transactionRepository.find({
      where: { user: { id } },
      order: {
        createdAt: 'DESC',
      },
      relations: {
        user: true,
        category: true, // returns related properties
      },
    })
  }

  async findOne(transactionId: number) {
    const transaction = await this.transactionRepository.findOne({
      where: { id: transactionId },
      relations: {
        user: true,
        category: true,
      },
    })

    if (!transaction) throw new NotFoundException('No transaction found')
    return transaction
  }

  async update(
    transactionId: number,
    updateTransactionDto: UpdateTransactionDto,
  ) {
    const transaction = await this.transactionRepository.findOne({
      where: { id: transactionId },
    })

    if (!transaction) throw new NotFoundException('No transaction found')

    return await this.transactionRepository.update(
      transactionId,
      updateTransactionDto,
    )
  }

  async remove(transactionId: number) {
    const transaction = await this.transactionRepository.findOne({
      where: { id: transactionId },
    })

    if (!transaction) throw new NotFoundException('No transaction found')
    return await this.transactionRepository.delete(transactionId)
  }

  async findAllWithPagination(id: number, page: number, limit: number) {
    const transactions = await this.transactionRepository.find({
      where: { user: { id } },
      relations: {
        user: true,
        category: true,
      },
      take: limit,
      skip: (page - 1) * limit,
    })

    // if (!transactions.length)
    //   throw new NotFoundException('No transaction found')
    return transactions
  }

  async findAllByType(id: number, type: string) {
    const transactions = await this.transactionRepository.find({
      where: { user: { id }, type },
    })

    const total = transactions.reduce((sum, entry) => sum + +entry.amount, 0)

    return total
  }
}
