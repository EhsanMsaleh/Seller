import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  FormArray,
} from '@angular/forms';
import { ISeller } from '../../ViewModel/user';
import { LoginService } from '../../Service/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthSellerService } from '../../Service/authSeller.service';
import{AuthService} from '../../Service/Auth/Auth.service';
@Component({
  selector: 'app-Login',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.scss'],
})
export class LoginComponent implements OnInit {
  errorMes?: string;
  islogin?: boolean;
  public email:string="";
  public Password:string="";
  public ISuserlog:boolean=false;
  constructor(
    private authseller: AuthSellerService,
    private fb: FormBuilder,
    private SellerService: LoginService ,
    private router: Router,
    private as: AuthService
  ) {}

  ngOnInit() {
    this.ISuserlog = this.authseller.IsUserLogged;
  }

 
  login(email:string,pass:string)
  {
     this.authseller.login(email,pass)
  }

  // login(form: any) {
  //   let data = form.value;

  //   return this.as.login(data.email, data.password).subscribe(() => {
  //     if (this.as.user) {
  //       let id = this.as.userID;
  //       let email = this.as.userEmail;
  //       localStorage.setItem(JSON.stringify(email), JSON.stringify(id));

  //       this.router.navigate(['/Products']);
  //     } else {
  //       this.errorMes = this.as.errorMsg;
  //     }
  //   });
  // }
}
