import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'
import { Category } from 'src/category/entities/category.entity'
import { User } from 'src/user/entities/user.entity'

export class CreateTransactionDto {
  @IsNotEmpty()
  title: string

  @IsNotEmpty()
  category: Category

  @IsNotEmpty()
  @IsNumber()
  amount: number

  @IsNotEmpty()
  @IsString()
  type: 'expense' | 'income'

  @IsOptional()
  user: User
}
