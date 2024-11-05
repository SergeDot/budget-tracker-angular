import { HttpEvent, HttpEventType, HttpHandler, HttpHandlerFn, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { API_URL } from '../constants/constants'
import { Injectable } from '@angular/core'
import { Observable, tap } from 'rxjs'

// @Injectable()
export class AuthInterceptor implements HttpInterceptor {
	constructor() {}

	intercept(req: HttpRequest<any>, next: HttpHandler) {
		console.log(`12aaa`)
		const token = localStorage.getItem('access_token')
		if (token) {
			req = req.clone({
				setHeaders: {
					Authorization: `Bearer ${token}`,
				},
				url: `${API_URL}/${req.url}`,
			})
		}
		return next.handle(req)
	}
}

export function loggingInterceptor(
	req: HttpRequest<unknown>,
	next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
	return next(req).pipe(
		tap((event) => {
			if (event.type === HttpEventType.Response) {
				console.log(req.url, 'returned a response with status', event.status)
			}
		})
	)
}
