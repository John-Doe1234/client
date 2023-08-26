import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './user.model.ts';

import firebase from 'firebase/compat';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularfireModule } from '@angular/fire/compat';

import { Observable, of, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User, Email } from './User';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore'
import { getAuth, createUserWithEmailAndPassword, SignInWithEmailAndPassword } from 'firebase/auth'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<User>;

  constructor(
  	private afAuth: AngularFireauth, 
	private afs: AngularFirestore, 
	private router: Router
  ) { }


 private updateUserData(user: User) {
	const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`)
 	
	const data = {
		uid: user.uid, 
		email: user.email, 
		displayName: user.displayName, 
		photoURL: user.photoURL
	}

	return userRef.set(data, {merge: true})
 }

 async googleSignIn() {
 	const provider = new firebase.auth.GoogleAuthProvider();
	const credential = await this.afAuth.SignInWithPopup(provider);
	return this.updateUserData(credential)
 }

 async emailSignUp(email: Email) {
	return this.afAuth.createUserWithEmailAndPassword(email.email, email.password)
		.then(credential => {
			updateUserData(credential);
		})
		.catch(e => {
			console.log(e.message);
		})
 }

 async emailSignIn(email: Email) {
	return this.afAuth.SignInWithEmailAndPassword(email.email, email.password)
		.catch(e => {
			console.log(e.message);
		})
 }
 
 async signOut() {
 	await this.afAuth.signOut();
	this.router.navigate(['/']);
 }
 
}
