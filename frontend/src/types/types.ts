export interface IUser {
  id: number,
  email: string,
  token:string
}

export interface IUserData {
  email: string,
  password: string
}

export interface IResponseUser {
  email: string | undefined,
  password: string | undefined,
  createdAt: string | undefined,
  updatedAt: string | undefined,
  id: string | undefined,
}

export interface IResponseUserData {
  token: string,
  user: IResponseUser
}

export interface ICategory {
  title: string,
  transactions?: [],
  createdAt: string,
  updatedAt: string,
  id: number,
}

export interface ITransaction {
  title: string,
  amount: number,
  createdAt: string,
  updatedAt: string,
  id: number,
  type: string
  category: ICategory
}

export interface IResponseTransactionLoader {
  categories: ICategory[],
  transactions: ITransaction[],
  totalIncome: number,
  totalExpense: number
}
