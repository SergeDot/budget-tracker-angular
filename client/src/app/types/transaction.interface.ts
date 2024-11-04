import { ICategory } from "./category.interface"

export interface ITransaction {
  id: number
  title: string
  amount: number
  createdAt: Date
  updatedAt: Date
  type: TransactionType
  category?: ICategory | null
}

export interface ITransactionData {
  title: string
  amount: number
  type: TransactionType
  category: number
  createdAt: Date
  updatedAt: Date
}

export type TransactionType = 'income' | 'expense'

