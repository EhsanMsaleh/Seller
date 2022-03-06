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
import { LoginLang } from './login-lang';
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
  langDet:boolean=false
  loginLang:string='';
  emailLang:string='';
  passwordLang:string='';
  lang:LoginLang;
  decide:string='';
  seller:any
  constructor(
    private authseller: AuthSellerService,
    private fb: FormBuilder,
    private SellerService: LoginService ,
    private router: Router,
    private as: AuthService,

 
  ) {
    this.lang={
      loginEn:"Login",
      loginAr:"تسجيل الدخول",
      emailEn:"Email ",
      emailAr:"البريد الألكتروني",
      passwordEn:"Password",
      passwordAr:"الرقم السري",
    }
  }

  ngOnInit() {
    this.ISuserlog = this.authseller.IsUserLogged;
    this.decide= localStorage.getItem('lang')
   console.log(this.decide)
    if(this.decide == null){
      this.loginLang=this.lang.loginEn;
  this.emailLang=this.lang.emailEn;
  this.passwordLang=this.lang.passwordEn;
    }
    this.switchHandle()
  }

 
  login(form:any)
  { let data= form.value;
    return this.as.login(data.Email, data.Password).subscribe(()=>{
      if(this.as.Seller){
        let id=this.as.userID;
        let email=this.as.userEmail;
        localStorage.setItem('id',JSON.stringify(id))
        this.authseller.getSellerById().subscribe((e)=>{
          e.map((e)=>{this.seller=e})
         })
        
        this.router.navigate(['/Home']);
        }else
        {
          this.errorMes=this.as.errorMsg;

        }
     
    })
    
  }


  switchHandle(){
    if(this.decide == 'EN'){
      this.langDet=!this.langDet
      let styled = document.getElementsByTagName('div')
      this.loginLang=this.lang.loginEn;
      this.emailLang=this.lang.emailEn;
      this.passwordLang=this.lang.passwordEn;

      if(styled.length!=0){
        for(let i=0; i<=styled.length; i++){
          styled[i].style.direction='ltr'
        }
      }
  
      
  
  
     } else if(this.decide == 'AR'){
       let styled = document.getElementsByTagName('div')
       this.loginLang=this.lang.loginAr;
  this.emailLang=this.lang.emailAr;
  this.passwordLang=this.lang.passwordAr;
      
       if(styled.length!=0){
         for(let i=0; i<=styled.length; i++){
           styled[i].style.direction='rtl'
         }
       }
  
  
      }
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
