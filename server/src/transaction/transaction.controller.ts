import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Req,
  Query,
} from '@nestjs/common'
import { TransactionService } from './transaction.service'
import { CreateTransactionDto } from './dto/create-transaction.dto'
import { UpdateTransactionDto } from './dto/update-transaction.dto'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { AuthorGuard } from 'src/guard/author.guard'

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard)
  create(@Body() createTransactionDto: CreateTransactionDto, @Req() req) {
    return this.transactionService.create(createTransactionDto, +req.user.id) // return is not necessary here
    // returns object
    /* {
  title: '4444b',
  amount: 44446,
  type: 'income',
  category: { id: 32 },
  user: { id: 1 },
  id: 80,
  createdAt: 2024-10-29T00:36:53.185Z,
  updatedAt: 2024-10-29T00:36:53.185Z
} */
  }

  @Get(':type/find')
  @UseGuards(JwtAuthGuard)
  findAllByType(@Req() req, @Param('type') type: string) {
    return this.transactionService.findAllByType(+req.user.id, type)
  }

  @Get('pagination')
  @UseGuards(JwtAuthGuard)
  findAllWithPagination(
    @Req() req,
    @Query('page') page: string,
    // @Query('page') page: number = 1, // with default value. This can also be set in the front end (setTotalPages(Math.ceil(transactions.length / limit)), with transactions querying via findAll)
    @Query('limit') limit: string,
    // @Query('limit') limit: number = 3, // with default value. This can also be set in the front end (<TransactionTable limit={5} />)
  ) {
    // Parse page and limit to numbers to ensure they are integers
    const pageNumber = Number(page) || 1 // If parsing fails, default to 1
    const limitNumber = Number(limit) || 3 // If parsing fails, default to 3

    return this.transactionService.findAllWithPagination(
      +req.user.id,
      pageNumber,
      limitNumber,
    )
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Req() req) {
    return this.transactionService.findAll(+req.user.id)
  }

  @Get(':type/:id')
  @UseGuards(JwtAuthGuard, AuthorGuard)
  findOne(@Param('id') transactionId: string) {
    return this.transactionService.findOne(+transactionId)
  }

  @Patch(':type/:id')
  @UseGuards(JwtAuthGuard, AuthorGuard)
  update(
    @Param('id') transactionId: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    return this.transactionService.update(+transactionId, updateTransactionDto)
  }

  @Delete(':type/:id')
  @UseGuards(JwtAuthGuard, AuthorGuard)
  remove(@Param('id') transactionId: string) {
    return this.transactionService.remove(+transactionId)
  }
}
