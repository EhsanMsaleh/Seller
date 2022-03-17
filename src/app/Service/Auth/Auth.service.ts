import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {  from, Observable } from 'rxjs';
import Swal from 'sweetalert2/src/sweetalert2.js'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userID!: string;
  userEmail!: string | null;
  errorMsg: string = '';
  Seller!: Observable<firebase.default.User | null>;
constructor(private auth: AngularFireAuth) {

  this. Seller = auth.user;
 }



 login(email: string, password: string) {
  return from(
    this.auth
      .signInWithEmailAndPassword(email, password)
      .then((e) => {
        console.log(this.Seller);

        this.userID = e.user!.uid;
        this.userEmail = e.user!.email;


      })
      .catch((error) => {this.errorMsg = error.message;
       
        Swal.fire({
          icon: 'error',
          title: 'error',
          text: 'wrong email or password !!',
          footer: '<a href="">please try again</a>'
        })
      //  alert("wrong email or password !!")

      })
  );
}
async Logout() {
  await this.auth.signOut();
localStorage.removeItem('id')

  console.log(this.Seller);
  
}

}
