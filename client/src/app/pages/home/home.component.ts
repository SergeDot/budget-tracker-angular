import { Component } from '@angular/core';
import { TransactionsFormComponent } from '../../components/transactions-form/transactions-form.component';
import { TransactionsTableComponent } from "../../components/transactions-table/transactions-table.component";
import { CategoriesComponent } from "../../components/categories/categories.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TransactionsFormComponent, CategoriesComponent, TransactionsTableComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
