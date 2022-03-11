import { Component, OnInit } from '@angular/core';
import { AuthSellerService } from 'src/app/Service/authSeller.service';
import { Router } from '@angular/router';
import { Seller } from '../../ViewModel/seller';
import { ProfileLang } from './profile-lang';
@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss'],
})
export class MyProfileComponent implements OnInit {
  seller: Seller;
  decide:string=''
  lang: ProfileLang;
  accover:string;
accdet:string
name:string
email:string
rate:string
Active:string
change:string
CompanyName:string
Phone:string
langDet:boolean=false 

  constructor(private sellerServ: AuthSellerService, private router: Router) {
    this.lang = {
      accoverEN: 'Account Overview',
      accdetEN: 'ACCOUNT DETAILS',
      nameEN: 'Name',
      emailEN: 'Email',
      rateEN: 'Rate',
      ActiveEN: 'Active',
      changeEN: 'CHANGE',
      CompanyNameEN: 'Company Name',
      PhoneEN: 'Phone',
      accoverAR: 'نظرة عامة على الحساب',
      accdetAR: 'تفاصيل الحساب',
      nameAR: 'الاسم',
      emailAR: 'ايميل',
      rateAR: 'التقييم',
      ActiveAR: 'الحالة',
      changeAR: 'تغيير',
      CompanyNameAR: 'اسم الشركة',
      PhoneAR: 'رقم الهاتف',
    };
  }

  ngOnInit(): void {
    this.sellerServ.getSellerById().subscribe((e) => {
      console.log(e);
      this.seller = e;
    });

    
    this.decide = localStorage.getItem('lang')
    console.log(this.decide)
    if (this.decide == null) {
     this.accover=this.lang.accoverEN
     this.accdet=this.lang.accdetEN
     this.name=this.lang.nameEN
     this.email=this.lang.emailEN
     this.Phone=this.lang.PhoneEN
     this.Active=this.lang.ActiveEN
     this.CompanyName=this.lang.CompanyNameEN
     this.change=this.lang.changeEN
     this.rate=this.lang.rateEN


    }
    //   console.log(this.sellerServ.getSellerId())
    //   let id = localStorage.getItem('id');
    //   this.seller=this.sellerServ.getSellerById(id)
    //   //this.sellerServ.getSellerById(id).subscribe((data)=>{this.seller=data})
    // console.log(this.seller)
    this.switchHandle()
  }
  switchHandle() {
    if (this.decide == 'EN') {
      this.langDet = !this.langDet
      let styled = document.getElementsByTagName('div')
      this.accover=this.lang.accoverEN
     this.accdet=this.lang.accdetEN
     this.name=this.lang.nameEN
     this.email=this.lang.emailEN
     this.Phone=this.lang.PhoneEN
     this.Active=this.lang.ActiveEN
     this.CompanyName=this.lang.CompanyNameEN
     this.change=this.lang.changeEN
     this.rate=this.lang.rateEN
      if (styled.length != 0) {
        for (let i = 0; i <= styled.length; i++) {
          styled[i].style.direction = 'ltr'
        }
      }
    } else if (this.decide == 'AR') {
      let styled = document.getElementsByTagName('div')
      this.accover=this.lang.accoverAR
     this.accdet=this.lang.accdetAR
     this.name=this.lang.nameAR
     this.email=this.lang.emailAR
     this.Phone=this.lang.PhoneAR
     this.Active=this.lang.ActiveAR
     this.CompanyName=this.lang.CompanyNameAR
     this.change=this.lang.changeAR
     this.rate=this.lang.rateAR
      if (styled.length != 0) {
        for (let i = 0; i <= styled.length; i++) {
          styled[i].style.direction = 'rtl'
        }
      }
    }
  }
}
