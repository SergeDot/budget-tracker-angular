import axios from 'axios'
import { getTokenFromLocalStorage } from '../helpers/localstorage.helper'
//http://localhost:3001/api

export const instance = axios.create({ // instance is created and axios methods can be called from it. Used to add token to requests
	baseURL: 'http://localhost:3001/api',
  headers: {
    Authorization: `Bearer ${getTokenFromLocalStorage() || ''}`,

  }
})