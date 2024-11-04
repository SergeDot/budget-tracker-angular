import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { ProfileComponent } from '../../pages/profile/profile.component';
import { AuthService } from '../../services/auth.service';

@Component({
	selector: 'app-header',
	standalone: true,
	imports: [ProfileComponent, FontAwesomeModule, RouterModule, CommonModule],
	templateUrl: './header.component.html',
	styleUrl: './header.component.scss',
})

export class HeaderComponent {
	isAuth = false
	logoutIcon = faArrowRightFromBracket

  constructor(public authService: AuthService) {

  }

  logoutHandler() {
    this.authService.logout()
  }
}
