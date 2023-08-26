import { Component } from '@angular/core';
import { AuthService } from '../auth.service.ts';
import { Router } from '@angular/router';
import { Email } from '../user.model.ts'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

	constructor(private authService: AuthService) {  }

	emailAuth(email: Email) {
		this.authService.emailSignIn(email)
			.catch(e => {
				console.log(e.message)
			})
	}
}
