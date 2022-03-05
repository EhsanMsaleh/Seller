import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Navigation, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/Service/product.service';
import { SellerService } from 'src/app/Service/seller.service';
import { Lang } from 'src/app/ViewModel/lang';
import { IProduct } from 'src/app/ViewModel/product';
import { ISeller } from 'src/app/ViewModel/user';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
Product: IProduct[]=[]
Products: Subscription
prods: IProduct
productsAmount:number = 0
outOfStockAmount:number = 0
sellerName:string=''
outOfStock:IProduct[]=[] 
activeProd:IProduct[]=[]
 
lang:Lang
langTry:{};
mysales:string='';
waitingShip:string='';
trdersShipped:string='';
trderHistory:string='';
totalSales:string='';
totalRevenue:string='';
salesHistory:string='';
myProds:string='';
activProds:string='';
outStock:string='';
sellNow:string='';
langDet:boolean=false
decide:string='';
  constructor( private prodServ: ProductService, private sellerServ: SellerService, private location: Location) { 
    this.lang={
        waitingEn:"waiting shipment",
        waitingAr:"ينتظر الشحن",
        shippedEn:"Orders Shipped",
        shippedAr:"الطلبات المشحونة",
        historyEn:"Orders History",
        historyAr:"تاريخ الطلبات",
        salesDEn:"Total Sales",
         salesDAr:"إجمالى المبيعات",
        revEn:"Total Revenue",
         revAr:"إجمالى الأرباح",
        saleHistEn:"Sales History",
         salesHistAr:"تاريخ المبيعات",
        activeEn:"Active Products",
         activeAr:"المنتجات المفعلة",
        outEn:"Out of Stock",
         outAr:"نفذت كميتها",

          sellEn:"sell Now",
          sellAr:"ابدأ البيع",
          salesEn:"My Sales",
           salesAr:"المبيعات",
          productsEn:"Products",
           productsAr:"المنتجات"
      
      
      }

  }
  
  ngOnInit(): void {
    /*this.sellerServ.getSellerData().subscribe((r)=>this.sellerName = r)
    console.log(this.sellerName)*/
this.decide= localStorage.getItem('lang')
   console.log(this.decide)
    if(this.decide == null){
    this.mysales= this.lang.salesEn
    this.waitingShip=this.lang.waitingEn;
    this.trdersShipped=this.lang.shippedEn;
    this.trderHistory=this.lang.historyEn;
    this.totalSales=this.lang.salesEn;
    this.totalRevenue=this.lang.revEn;
    this.salesHistory=this.lang.historyEn;
    this.myProds=this.lang.productsEn;
    this.activProds=this.lang.activeEn;
    this.outStock=this.lang.outEn;
    this.sellNow=this.lang.sellEn;
}
   
  /**/




    this.prodServ.getAllproduct()
    /*this.prodServ.prod.subscribe((e)=>{
      this.prods=e
      console.log(this.prods)
     if(this.prods.Quantity!=0 && this.prods.Accepted == true){
        this.Product.push(this.prods)
      } else if(this.prods.Quantity==0 && this.prods.Accepted == true){
        this.outOfStock.push(this.prods)
      } else if(this.prods.Accepted == false){
        this.rejected.push(this.prods);
      }
      
      console.log(this.outOfStock)
      console.log(this.Product)
      this.productsAmount = this.Product.length
     // var out:any = this.Product.filter(e=>e.Quantity==0)
      
      this.outOfStockAmount = this.outOfStock.length
      this.rejectAmount = this.rejected.length
    })*/
    console.log(this.prodServ.mainPageData().subscribe(data =>{console.log(data)
    
      }))
    this.Products=this.prodServ.getAllproduct()
    .subscribe(
    // data=>{this.result=data}
    //this.prod.next(e); this.result=e; this.resarr.push(this.result);
      data =>{this.Product=data.map((el)=>{
        
        return{
          id:el.payload.doc.id,
          ...(el.payload.doc.data() as IProduct)
        
     
        
        }
      
      });
    
      console.log(this.Product)

  /*          this.prodServ.getAllproduct()
    
        this.prodServ.prod.subscribe((e) => {
    
          this.prods = e
    */
    this.Product.map((e)=>{
      this.prods = e

         if(this.prods.Quantity!=0){
       this.activeProd.push(this.prods)
    console.log(this.prods)
  } else if(this.prods.Quantity==0){
    this.outOfStock.push(this.prods)
  }
     

    
  })
  
  
 
    console.log(this.prods)
    this.productsAmount = this.activeProd.length
    // var out:any = this.Product.filter(e=>e.Quantity==0)
    
    console.log(this.outOfStock)

           this.outOfStockAmount = this.outOfStock.length
  
    
        
})
this.switchHandle()
  }
//)}

switchHandle(){
  if(this.decide == 'EN'){
    this.langDet=!this.langDet
    let styled = document.getElementsByTagName('div')
this.mysales= this.lang.salesEn
    this.waitingShip=this.lang.waitingEn;
    this.trdersShipped=this.lang.shippedEn;
    this.trderHistory=this.lang.historyEn;
    this.totalSales=this.lang.salesEn;
    this.totalRevenue=this.lang.revEn;
    this.salesHistory=this.lang.historyEn;
    this.myProds=this.lang.productsEn;
    this.activProds=this.lang.activeEn;
    this.outStock=this.lang.outEn;
    this.sellNow=this.lang.sellEn;
    if(styled.length!=0){
      for(let i=0; i<=styled.length; i++){
        styled[i].style.direction='ltr'
      }
    }

    


   } else if(this.decide == 'AR'){
     let styled = document.getElementsByTagName('div')
     this.mysales= this.lang.salesAr
    this.waitingShip=this.lang.waitingAr;
    this.trdersShipped=this.lang.shippedAr;
    this.trderHistory=this.lang.historyAr;
    this.totalSales=this.lang.salesAr;
    this.totalRevenue=this.lang.revAr;
    this.salesHistory=this.lang.historyAr;
    this.myProds=this.lang.productsAr;
    this.activProds=this.lang.activeAr;
    this.outStock=this.lang.outAr;
    this.sellNow=this.lang.sellAr;
     if(styled.length!=0){
       for(let i=0; i<=styled.length; i++){
         styled[i].style.direction='rtl'
       }
     }


    }
}
}
