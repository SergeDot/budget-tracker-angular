import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SignupComponent } from './pages/signup/signup.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { TransactionsFormComponent } from './components/transactions-form/transactions-form.component';
import { TransactionsTableComponent } from './components/transactions-table/transactions-table.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-root', // selector that is used in index.html
  standalone: true,
  imports: [RouterOutlet, HomeComponent, LoginComponent, ProfileComponent, SignupComponent, CategoriesComponent, HeaderComponent, TransactionsFormComponent, TransactionsTableComponent, FontAwesomeModule],
  templateUrl: './app.component.html',
  // styleUrl: './app.component.scss' // tailwind will be used
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'client';
}
