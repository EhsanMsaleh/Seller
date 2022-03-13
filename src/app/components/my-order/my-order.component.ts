import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {Orders} from '../../ViewModel/orders'
import {OrdersService} from '../../Service/orders.service';
import { ISeller } from 'src/app/ViewModel/user';
import { parse } from 'path';
import { OrderData } from 'src/app/ViewModel/order-data';
import{OrderLang} from './order-lang'
@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.scss']
})
export class MyOrderComponent implements OnInit {
  Orders:Observable<Orders[]>;
  dates:string[]=[]
  buyers:string[]=[]
  quantities:number[]=[]
  prices:number[]=[]
  prodnames:string[]=[]
  prodnamesAr:string[]=[]
  quantity:number=0
  price:number=0
  total:number=0
  try:number=0
  orders:OrderData[] = []
  orders3:OrderData[] = []
  arrOorders:OrderData[] = []
  orders2 = new BehaviorSubject<OrderData[]>([])
  decide:string=''
  lang: OrderLang;
  order:string
  buyer:string
  prodname:string
  date:string
  status:string
  totallang:string
langDet:boolean=false 

  constructor(private orderServ:OrdersService) {
    this.lang={
      orderEN:'Order',
      buyerEN:'Buyer',
      prodnameEN:'Product Name',
      dateEN:'Date',
      statusEN:'Status',
      totalEN:'Total',
  
      orderAR:'طلبات',
      buyerAR:'المشتري',
      prodnameAR:'اسم المنتج',
      dateAR:'التاريخ',
      statusAR:'الحالة',
      totalAR:'المجموع',

    }
    //this.Orders=orderServ.getAllOrders();
    }
  
    async ngOnInit() {
      await this.getOrdersData()
    this.decide = localStorage.getItem('lang')
    
    console.log(this.decide)
    if (this.decide == null) {
      this.order=this.lang.orderEN
      this.buyer=this.lang.buyerEN
      this.date=this.lang.dateEN
      this.prodname=this.lang.prodnameEN
      this.totallang=this.lang.totalEN
      this.status=this.lang.statusEN
    }
    this.switchHandle()
    

  
    /*this.orderServ.orderDate.subscribe(e=>this.dates.push(e))
    this.orderServ.orderBuyer.subscribe(e=>{this.buyers.push(e);})
                                           
    this.orderServ.quantity.subscribe(e=>{this.quantity=e;
                                      this.quantities.push(e)})
    this.orderServ.price.subscribe(
    (e)=>{ this.price=e;
          this.prices.push(this.price);
           console.log(this.prices)
               
          this.try = this.prices.reduce((a,b)=>a+b,0)
          console.log(this.try)
          })
 
    this.orderServ.prodName.subscribe(e=>this.prodnames.push(e))
    this.orderServ.prodNameAr.subscribe(e=>this.prodnamesAr.push(e))

    this.orderServ.getAllOrders()
    this.orderServ.orderSeller.subscribe(e=>{let asData = e.SellerID.id;
      console.log(asData)
    })*/
     
  }

  async getOrdersData(){
   

    this.orderServ.getAllOrders()
   this.orderServ.ordersdata.subscribe(e=>
    
  {  
    
       
      this.arrOorders.push(e)

    
    
    
    
    this.orders2.next(this.orders)
    console.log(this.orders)
  })
  this.arrOorders.pop()
  console.log(this.arrOorders)

  }
  switchHandle() {
    if (this.decide == 'EN') {
      this.langDet = !this.langDet
      let styled = document.getElementsByTagName('div')
      this.order=this.lang.orderEN
      this.buyer=this.lang.buyerEN
      this.date=this.lang.dateEN
      this.prodname=this.lang.prodnameEN
      this.totallang=this.lang.totalEN
      this.status=this.lang.statusEN
      if (styled.length != 0) {
        for (let i = 0; i <= styled.length; i++) {
          styled[i].style.direction = 'ltr'
        }
      }
    } else if (this.decide == 'AR') {
      let styled = document.getElementsByTagName('div')
      this.order=this.lang.orderAR
      this.buyer=this.lang.buyerAR
      this.date=this.lang.dateAR
      this.prodname=this.lang.prodnameAR
      this.totallang=this.lang.totalAR
      this.status=this.lang.statusAR
      if (styled.length != 0) {
        for (let i = 0; i <= styled.length; i++) {
          styled[i].style.direction = 'rtl'
        }
      }
    }
  }

}
