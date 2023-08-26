import { Component } from '@angular/core';
import { AuthService } from '../auth.service.ts';
import { Router } from '@angular/router';
import { Email } from '../user.model.ts';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
	
	constructor(
		private router: Router, 
		private authService: AuthService   
		   ) {  }

	signUpUser(email: Email) {
		this.authService.emailSignUp(email)
			.catch(e => {
				console.log(e.message)
			})
	}

}
