import { FC } from 'react'
import TransactionForm from '../components/TransactionForm'
import { instance } from '../api/axios.api'
import {
	ICategory,
	IResponseTransactionLoader,
	ITransaction,
} from '../types/types'
import { useLoaderData } from 'react-router-dom'
import { toast } from 'react-toastify'
import TransactionTable from '../components/TransactionTable'
import { formatToUSD } from '../helpers/currency.helper'
import { Chart } from '../components/Chart'

export const transactionLoader = async () => {
	const categories = await instance.get<ICategory[]>('/categories')
	const transactions = await instance.get<ITransaction[]>('/transactions')
	const totalIncome = await instance.get('/transactions/income/find')
	const totalExpense = await instance.get('/transactions/expense/find')
	const data = {
		categories: categories.data,
		transactions: transactions.data,
		totalIncome: totalIncome.data,
		totalExpense: totalExpense.data,
	}
	return data
}
export const transactionAction = async ({ request }: any) => {
	switch (request.method) {
		case 'POST': {
			const formData = await request.formData()
			const newTransaction = {
				title: formData.get('title'),
				amount: +formData.get('amount'),
				category: formData.get('category'),
				type: formData.get('type'),
			}

			await instance.post('/transactions', newTransaction)
			toast.success('Transaction added')
			return null
		}
		case 'PATCH': {
			// const formData = await request.formData()
			// const category = {
			// 	id: formData.get('id'),
			// 	title: formData.get('title'),
			// }
			// await instance.patch(`/categories/category/${category.id}`, category)
			return null
		}
		case 'DELETE': {
			const formData = await request.formData()
			const transactionId = formData.get('id')
			await instance.delete(`/transactions/transaction/${transactionId}`)
			toast.success('Transaction deleted')
			return null
		}
	}

	return
}
// TODO: Error: Firefox can’t establish a connection to the server at ws://localhost:5173/. Solution: https://stackoverflow.com/questions/48904150/firefox-can-t-establish-a-connection-to-the-server-at-ws-localhost8080
export const Transactions: FC = () => {
	const { totalIncome, totalExpense } =
		useLoaderData() as IResponseTransactionLoader
	return (
		<>
			<div className="grid grid-cols-3 gap-4 mt-4 items-start">
        {/* TODO: clear the form after entry */}
        {/* TODO: check console error when no data and 1 category */}
				{/* Add tr form */}
				<div className="col-span-2 grid">
					<TransactionForm />
				</div>

				{/* Stat block */}
				<div className="rounded-md bg-slate-800 p-3">
					<div className="grid grid-cols-2 gap-3">
						<div>
							<p className="text-md text-center font-bold uppercase">
								Total Income
							</p>
							<p className="mt-2 rounded-sm bg-green-600 p-1 text-center">
								{formatToUSD.format(totalIncome)}
							</p>
						</div>
						<div>
							<p className="text-md text-center font-bold uppercase">
								Total Expense:
							</p>
							<p className="mt-2 rounded-sm bg-red-500 p-1 text-center">
								{formatToUSD.format(totalExpense)}
							</p>
						</div>
					</div>
					<>
						<Chart totalIncome={totalIncome} totalExpense={totalExpense} />
					</>
				</div>
			</div>

			{/* Transaction table */}
			<h1 className="my-5">
				<TransactionTable limit={5} />
			</h1>
		</>
	)
}
