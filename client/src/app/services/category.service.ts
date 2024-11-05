import { HttpClient } from '@angular/common/http'
import { Injectable, signal } from '@angular/core'
import { ToastrService } from 'ngx-toastr'
import { ICategory } from '../types/category.interface'
import { API_URL } from '../constants/constants'

@Injectable({
	providedIn: 'root',
})
export class CategoryService {
	categoriesSig = signal<ICategory[]>([])
	constructor(
		private readonly http: HttpClient,
		private readonly toastr: ToastrService
	) {}

	findAll() {
    this.categoriesSig.set([])
    console.log(`17aaa`, this.categoriesSig)
    const token = localStorage.getItem('access_token')
		return this.http
			.get<ICategory[]>(`${API_URL}/categories`, { headers:
        {Authorization: `Bearer ${token}`},
      })
			.subscribe((categories: ICategory[]) => {
        console.log(`22aaa`, categories)
				this.categoriesSig.set(categories)
			})
		// let r =  this.http
		// 	.get<ICategory[]>('categories')
		// 	.subscribe((categories: ICategory[]) => {
    //     console.log(`22aaa`, categories)
		// 		this.categoriesSig.set(categories)
		// 	})
    //   return r
	}

	create(title: string) {
		return this.http
			.post<ICategory>('categories', { title })
			.pipe()
			.subscribe((newCategory: ICategory) => {
				this.categoriesSig.update((categories) => [...categories, newCategory])
			})
	}

	// findAll() {
	//   return this.http.get<ICategory[]>('categories').pipe().subscribe((categories: ICategory[]) => {
	//     this.categoriesSig.set(categories)
	//   })
	// }

	// findAll() {
	//   return this.http.get<ICategory[]>('categories').pipe().subscribe((categories: ICategory[]) => {
	//     this.categoriesSig.set(categories)
	//   })
	// }
}
