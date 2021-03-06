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
import {SellerService} from '../../Service/seller.service';
import Swal from 'sweetalert2/src/sweetalert2.js'
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
  seller:any;
  IsActive:boolean;
  IsNew:boolean;
  constructor(
    private authseller: AuthSellerService,
    private fb: FormBuilder,
    private SellerService: LoginService ,
    private router: Router,
    private as: AuthService,
private sellerserv:SellerService
 
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
       
       this.sellerserv.checkSeller(this.as.userID).subscribe((e)=>{
         console.log(e)
         
         if(e.length>0)
         {
           e.map((e:any)=>{
             this.IsActive=e.IsActive
             this.IsNew=e.IsNew
           })
          let id=this.as.userID;
          let email=this.as.userEmail;
          localStorage.setItem('id',JSON.stringify(id))
          if( this.IsActive==false )
          {
           
            Swal.fire({
              icon: 'info',
              title: 'Waiting',
              text: 'for admin to accept your account...',
              footer: '<a href="">Hope to see you soon</a>'
            })

              // alert("wating for admin to accept your account...");
              localStorage.removeItem('id');
            }
            else if(this.IsNew==true)
            {
              Swal.fire({
                icon: 'info',
                title: 'Waiting',
                text: 'you are a new seller , wating for admin to change your state...',
                footer: '<a href="">Hope to see you soon</a>'
              })
              // alert("you are a new seller , wating for admin to change your state...")  
            }
          else if( this.IsActive==true && this.IsNew==false  ){
            window.location.replace('/Home')
            // this.router.navigate(['/Home']);

          
          }
          

         }
         else if(e.length=0){
           
          Swal.fire({
            icon: 'error',
            title: 'not a seller',
            text: 'please sign up in jumia website to be one !!!',
            footer: '<a href="">Hope to see you soon</a>'
          })
         // alert('you are not a seller , please sign up in jumia website to be one !!!')
         }
       })
       
        }
        else
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

}
