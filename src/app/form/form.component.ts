import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from '../auth.service.ts'

import { FormGroup, Formbuilder, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { Email } from '../user.model.ts';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
	@Input()
	initialState: BehaviorSubject<Email> = new BehaviorSubject({} as any)

	@Output()
	formValuesChanged = new EventEmitter<Email>()

	@Output()
	formSubmitted = new EventEmitter<Email>()

	form: FormGroup = new FormGroup({})

	constructor(
		private fb: FormBuilder, 
		private authService: AuthService, 
		private router: Router
	) {}

	ngOnInit() {
		this.initialState.subscribe(user => {
			this.userForm = this.fb.group({
				email: [user.email], 
				password: [ user.password, [Validators.required, validators.minLength(8)]]
			})
		})
		
		this.userForm.valueChanges.subscribe(a => {this.formValuesChanged.emit(a)})

	}

	submitForm() {
		this.formSubmitted.emit(this.userForm.value)
	}

}
