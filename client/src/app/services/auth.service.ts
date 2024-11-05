import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Injectable, signal } from '@angular/core'
import { Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr'
import { IAuthUser, IUser } from '../types/user.interface'
import { API_URL } from '../constants/constants'
import { catchError, tap } from 'rxjs'

@Injectable({
	providedIn: 'root',
})
export class AuthService {
  isAuthSig = signal<boolean>(false)

	constructor(
		private readonly http: HttpClient,
		private readonly router: Router,
		private readonly toastr: ToastrService
	) {
    const token = localStorage.getItem('access_token')
    this.isAuthSig.set(!!token)
  }

	signUp(userData: IAuthUser) {
		return this.http
			.post(`${API_URL}/user`, userData) // is return needed?
			.pipe(
        tap(() => {
          this.login(userData) // logs in at regging
        }),
				catchError(err => {
					this.handleError(err)
					throw new Error(err.message)
				})
			)
			.subscribe(() => this.toastr.success('Created'))
	}

	login(userData: IAuthUser) {// is return needed?
		return this.http
			.post<IUser>(`${API_URL}/auth/login`, userData)
			.pipe(
				tap((res: IUser) => {
					localStorage.setItem('access_token', res.access_token)
          this.isAuthSig.set(true)
				}),
        catchError(err => {
          this.handleError(err)
          throw new Error(err.message)
        })
      )
			.subscribe(() => {
        this.toastr.success('Logged in successfully')
        this.router.navigate(['/home'])
      })
	}

  logout() {
    localStorage.removeItem('access_token')
    this.isAuthSig.set(false)
    this.toastr.success('Logged out successfully')
    this.router.navigate(['/login'])
  }

	private handleError(err: HttpErrorResponse): void {
		this.toastr.error(err.error.message)
	}
}
