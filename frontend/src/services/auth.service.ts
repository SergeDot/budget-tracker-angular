import { instance } from '../api/axios.api'
import { IResponseUserData, IUser, IUserData } from '../types/types'

export const AuthService = {
	async registration(
		userData: IUserData,
	): Promise<IResponseUserData | undefined> { // type in promise must match type in response
		// const { data } = await instance.post<IUserData, {data: IResponseUserData}>('user', userData) // '{data: IResponseUserData}' defines the type of response '{ data }'. Not clear what IUserData defines
		const { data } = await instance.post<IResponseUserData>('user', userData) // same way as above. Defines type only for response
		return data
	},
	async login(userData: IUserData): Promise<IUser | undefined> {
    const { data } = await instance.post<IUser>('auth/login', userData)
    return data
  },
	async getProfile(): Promise<IUser | undefined> {
    const {data} = await instance.get<IUser>('auth/profile')
    if (data) return data
  },
}



/*
export interface IUserData {
  email: string,
  password: string
}

export interface IResponseUserData {
  email: string | undefined,
  password: string | undefined,
  createdAt: string | undefined,
  updatedAt: string | undefined,
  _v?: number | undefined,
  _id?: string | undefined,
  message: string | undefined 
}
*/