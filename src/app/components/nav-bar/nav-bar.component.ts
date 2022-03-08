import { Component, OnInit } from '@angular/core';
import { authInstanceFactory } from '@angular/fire/auth/auth.module';
import { Router } from '@angular/router';
import { AuthErrorCodes } from 'firebase/auth';
import { AuthService } from 'src/app/Service/Auth/Auth.service';
import { NavLang } from './nav-lang';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  public IsUserLog:boolean=false;
  token:string='';
shownlang:boolean=false;
langDet:boolean=false

  lang:NavLang;
  decide:string='';
  homeLang:string='';
  addprodLang:string='';
  orderLang:string='';
  salesLang:string='';
  prodsLang:string='';
  loginLang:string='';
  logoutLang:string='';
  accountLang:string='';
  constructor(
   private authSel:AuthService,
   private router:Router
    ) { 
    
    this.lang={
     
      homeEn:"Home",
      addprodEn:"Add Product",
      orderEn:"Orders",
      salesEn:"Sales",
      prodsEn:"Products",
      loginEn:"Login",
      logoutEn:"Logout",
      accountEn:'Account',
      homeAr:"الرئيسية",
      addprodAr:"إضافة منتج",
      orderAr:"الطلبات",
      salesAr:"المبيعات",
      prodsAr:"المنتجات",
      loginAr:"تسجيل الدخول",
      logoutAr:"تسجيل الخروج",
      accountAr:'حسابي'
    }

  }

  ngOnInit(): void {
    if(localStorage.getItem('id'))
    {
      this.IsUserLog=true
    }
    else
    {this.IsUserLog=false}
   
    this.decide= localStorage.getItem('lang')
   console.log(this.decide)
    if(this.decide == null){
   this.homeLang=this.lang.homeEn;
      this.addprodLang=this.lang.addprodEn;
    this.orderLang=this.lang.orderEn;
    this.salesLang=this.lang.salesEn;
    this.prodsLang=this.lang.prodsEn;
    this.loginLang=this.lang.loginEn;
     this.logoutLang=this.lang.logoutEn;
     this.accountLang=this.lang.accountEn;
    }
    this.switchHandle()
  
  }


  logout()
  {
   this.authSel.Logout();
   this.router.navigateByUrl('/Login')
   window.location.reload()

   
  }
  switch(){

    let decide= localStorage.getItem('lang')
    console.log(decide)
    
    /* switch(decide){
      case "'EN'": this.token = "AR"
      localStorage.setItem('lang', this.token)
      
      break;
      case "'AR'":    this.token = "EN"
      localStorage.setItem('lang', this.token)
      break;
    
    }*/

   if(decide == 'EN'){
      this.token = "AR"
      localStorage.setItem('lang', this.token)
    } else if( decide == 'AR'){
      this.token = "EN"
      localStorage.setItem('lang', this.token)
    }
   
      
      window.location.reload()
  }


  switchHandle(){
    if(this.decide == 'EN'){
      this.langDet=!this.langDet
      let styled = document.getElementsByTagName('div')
      this.homeLang=this.lang.homeEn;
      this.addprodLang=this.lang.addprodEn;
    this.orderLang=this.lang.orderEn;
    this.salesLang=this.lang.salesEn;
    this.prodsLang=this.lang.prodsEn;
    this.loginLang=this.lang.loginEn;
     this.logoutLang=this.lang.logoutEn;
     this.accountLang=this.lang.accountEn;

      if(styled.length!=0){
        for(let i=0; i<=styled.length; i++){
          styled[i].style.direction='ltr'
        }
      }
  
      
  
  
     } else if(this.decide == 'AR'){
       let styled = document.getElementsByTagName('div')
       this.homeLang=this.lang.homeAr;
       this.addprodLang=this.lang.addprodAr;
     this.orderLang=this.lang.orderAr;
     this.salesLang=this.lang.salesAr;
     this.prodsLang=this.lang.prodsAr;
     this.loginLang=this.lang.loginAr;
      this.logoutLang=this.lang.logoutAr;
      this.accountLang=this.lang.accountAr;
      
       if(styled.length!=0){
         for(let i=0; i<=styled.length; i++){
           styled[i].style.direction='rtl'
         }
       }
  
  
      }
  }


}
