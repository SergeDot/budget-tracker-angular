import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import {
	FormControl,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { faRemove, faEdit } from '@fortawesome/free-solid-svg-icons'
import { CategoryService } from '../../services/category.service'

@Component({
	selector: 'app-categories',
	standalone: true,
	imports: [FontAwesomeModule, ReactiveFormsModule, CommonModule],
	templateUrl: './categories.component.html',
	styleUrl: './categories.component.scss',
})
export class CategoriesComponent implements OnInit {
	categoryForm: FormGroup

	removeIcon = faRemove
	editIcon = faEdit

	constructor(public categoryService: CategoryService) {
		this.categoryForm = new FormGroup({
			title: new FormControl('', [Validators.required]),
		})
	}

	ngOnInit(): void {
    console.log(`33bbb`)
    this.categoryService.findAll()
    // let r = this.categoryService.categoriesSig.length
    // console.log(`34`, r)
  }

	onSubmit() {
		if (this.categoryForm.valid) {
			console.log(`29`, this.categoryForm.value)
		}
	}
}
