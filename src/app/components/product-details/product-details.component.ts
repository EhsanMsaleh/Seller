import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import {ProductService} from '../../Service/product.service';
import {IProduct} from './../../ViewModel/product';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductFormComponent } from '../product-form/product-form.component';
import { Location } from '@angular/common';
import { ProdDetLang } from '../product-details/prod-det-lang';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
prodId:any;
product:any;
lang:ProdDetLang
langDet:boolean=false
  decide:string=''
  prodDets:string=''
    name:string=''
    description:string=''
    quant:String=''
    price:string=''
    cat:string=''
    sizeDim:string=''
    backe:String=''

  constructor(private location: Location, private modal: NgbModal,private prodServ:ProductService, private ActivatedRouteServ:ActivatedRoute, private router:Router) { 

    this.lang={
      prodDetsEn:"Product Details",
      nameEn:"Name:",
      descriptionEn:"Description:",
      quantEn:"Quantity:",
      priceEn:"Price:",
      catEn:"Category:",
      sizeDimEn:"Available Size or Dimension: ",
      backEn:"Back",
      prodDetsAr:"تفاصيل المنتج",
      nameAr:"الأسم:",
      descriptionAr:"وصف المنتج:",
      quantAr:"الكمية المتاحة:",
      priceAr:"السعر:",
      catAr:"الفئة:",
      sizeDimAr:"الحجم/الابعاد:",
      backAr:"رجوع",
      
      }
  }

  ngOnInit() {

    this.decide = localStorage.getItem('lang')
      console.log(this.decide)
      if (this.decide == null) {
    
      this.prodDets=this.lang.prodDetsEn
      this.name=this.lang.nameEn
      this.description=this.lang.descriptionEn
      this.quant=this.lang.quantEn
      this.price=this.lang.priceEn
      this.cat=this.lang.catEn
      this.sizeDim=this.lang.sizeDimEn
      this.backe=this.lang.backEn
      }
    console.log(this.ActivatedRouteServ.snapshot.params['pid']);

    this.ActivatedRouteServ.paramMap.subscribe((paramMap)=>{
      this.prodId=this.ActivatedRouteServ.snapshot.params['pid']
      console.log(this.prodId)
      this.prodServ.getProdByID(this.prodId).subscribe((prod)=>{
        this.product=prod;

      })
    })  
    this.switchHandle()
  } 
  // editModal(prod:IProduct) {
  //   const modalRef = this.modal.open(ProductFormComponent, {
  //     size: 'lg',
  //     centered: true,
  //     windowClass: 'dark-modal',
  //   });

  //   modalRef.componentInstance.id = prod.id;
  // }
 back(){
  this.location.back()
 }


 switchHandle() {
  if (this.decide == 'EN') {
    this.langDet = !this.langDet
    let styled = document.getElementsByTagName('div')
    this.prodDets=this.lang.prodDetsEn
    this.name=this.lang.nameEn
    this.description=this.lang.descriptionEn
    this.quant=this.lang.quantEn
    this.price=this.lang.priceEn
    this.cat=this.lang.catEn
    this.sizeDim=this.lang.sizeDimEn
    this.backe=this.lang.backEn
    if (styled.length != 0) {
      for (let i = 0; i <= styled.length; i++) {
        styled[i].style.direction = 'ltr'
      }
    }
  } else if (this.decide == 'AR') {
    let styled = document.getElementsByTagName('div')
    this.prodDets=this.lang.prodDetsAr
    this.name=this.lang.nameAr
    this.description=this.lang.descriptionAr
    this.quant=this.lang.quantAr
    this.price=this.lang.priceAr
    this.cat=this.lang.catAr
    this.sizeDim=this.lang.sizeDimAr
    this.backe=this.lang.backAr
    if (styled.length != 0) {
      for (let i = 0; i <= styled.length; i++) {
        styled[i].style.direction = 'rtl'
      }
    }
  }
}

}
