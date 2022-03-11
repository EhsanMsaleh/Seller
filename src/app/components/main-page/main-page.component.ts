import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Navigation, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthSellerService } from 'src/app/Service/authSeller.service';

import { OrdersService } from 'src/app/Service/orders.service';

import { ProductService } from 'src/app/Service/product.service';
import { SellerService } from 'src/app/Service/seller.service';
import { Lang } from 'src/app/ViewModel/lang';
import { OrderData } from 'src/app/ViewModel/order-data';
import { IProduct } from 'src/app/ViewModel/product';
import { Seller } from 'src/app/ViewModel/seller';
import { ISeller } from 'src/app/ViewModel/user';
import {MatTableDataSource} from '@angular/material/table'
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  public IsUserLog:boolean=false;

  Product: IProduct[] = []
  Products: Subscription
  prods: IProduct  
  productsAmount: number = 0
  outOfStockAmount: number = 0
  sellerName: string = ''
  outOfStock: IProduct[] = []
  activeProd: IProduct[] = []
arrOrders: OrderData[]=[]
pendOrders: OrderData[]=[]
delOrders: OrderData[]=[]

  lang: Lang
  langTry: {};
  mysales: string = '';
  waitingShip: string = '';
  trdersShipped: string = '';
  trderHistory: string = '';
  totalSales: string = '';
  totalRevenue: string = '';
  salesHistory: string = '';
  myProds: string = '';
  activProds: string = '';
  outStock: string = '';
  sellNow: string = '';
  langDet: boolean = false
  decide: string = '';
  delivered: number[] = []
  pending: number[] = []
  deliverNo: number = 0
  pendingNo: number = 0
  totalOrders: number = 0
  revenue: number = 0
  sales: number = 0
  price: number = 0
  prices: number[] = []
  name:string=''
  Seller:ISeller
  constructor(private prodServ: ProductService,private sellerServa: AuthSellerService ,private sellerServ: SellerService, private location: Location, private orderServ: OrdersService, private router: Router) {
    this.lang = {
      waitingEn: "waiting shipment",
      waitingAr: "ينتظر الشحن",
      shippedEn: "Orders Shipped",
      shippedAr: "الطلبات المشحونة",
      historyEn: "Orders History",
      historyAr: "تاريخ الطلبات",
      salesDEn: "Total Sales",
      salesDAr: "إجمالى المبيعات",
      revEn: "Total Revenue",
      revAr: "إجمالى الأرباح",
      saleHistEn: "Sales History",
      salesHistAr: "تاريخ المبيعات",
      activeEn: "Active Products",
      activeAr: "المنتجات المفعلة",
      outEn: "Out of Stock",
      outAr: "نفذت كميتها",
      sellEn: "sell Now",
      sellAr: "ابدأ البيع",
      salesEn: "My Sales",
      salesAr: "المبيعات",
      productsEn: "Products",
      productsAr: "المنتجات"
    }

  }


 async ngOnInit() {

    this.sellerServa.getSellerById().subscribe((e)=>{
      console.log(e)
        this.Seller = e
    
     })

    /*this.sellerServ.getSellerData().subscribe((r)=>this.sellerName = r)
    console.log(this.sellerName)*/
    if(localStorage.getItem('id'))
    {
      this.IsUserLog=true
    }
    else
    {this.IsUserLog=false}



    this.decide = localStorage.getItem('lang')
    console.log(this.decide)
    if (this.decide == null) {
      this.mysales = this.lang.salesEn
      this.waitingShip = this.lang.waitingEn;
      this.trdersShipped = this.lang.shippedEn;
      this.trderHistory = this.lang.historyEn;
      this.totalSales = this.lang.salesEn;
      this.totalRevenue = this.lang.revEn;
      this.salesHistory = this.lang.saleHistEn;
      this.myProds = this.lang.productsEn;
      this.activProds = this.lang.activeEn;
      this.outStock = this.lang.outEn;
      this.sellNow = this.lang.sellEn;
    }

    /**/
      
    await this.getSales()
    this.sales=0
   // this.orderServ.arrOorders.subscribe(e=>{
     
 
    //console.log(e)})


    /*this.orderServ.delivered.subscribe(e => {this.delivered.push(0);
    console.log(this.delivered, 'delivered')})
    
    this.orderServ.pending.subscribe(e => this.pending.push(1))
    console.log(this.delivered, this.pending)
    this.orderServ.price.subscribe((e) => {
      
      this.price = e;
      this.prices.push(this.price);
      console.log(this.prices)
      this.sales = this.prices.reduce((a,b)=>a+b,0)
      this.revenue = this.sales*0.9
      })
    this.deliverNo = this.delivered.length;
    this.pendingNo = this.pending.length
    this.totalOrders = this.deliverNo + this.pendingNo

    console.log(this.pendingNo, this.pending)

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
    })
   

    console.log(this.sales)
*/
    this.Products = this.prodServ.getAllproduct()
      .subscribe(
        // data=>{this.result=data}
        //this.prod.next(e); this.result=e; this.resarr.push(this.result);
        data => {
          this.Product = data.map((el) => {
            console.log(el.payload.doc.data())
            return {
              id: el.payload.doc.id,
              ...(el.payload.doc.data() as IProduct)
            }

          });

          console.log(this.Product)

          /*          this.prodServ.getAllproduct()
            
                this.prodServ.prod.subscribe((e) => {
            
                  this.prods = e
            */
          this.Product.map((e) => {
            this.prods = e
            if(this.decide == 'Ar'){
              this.name=e.NameAr
              console.log(this.name)
            } else if(this.decide == "En"){
              this.name = e.Name
              console.log(this.name)
            }
              
            if (this.prods.Quantity != 0) {
              this.activeProd.push(this.prods)
              console.log(this.prods)
            } else if (this.prods.Quantity == 0) {
              this.outOfStock.push(this.prods)
            }
          })
          console.log(this.prods)
          this.productsAmount = this.activeProd.length
          // var out:any = this.Product.filter(e=>e.Quantity==0)

          console.log(this.outOfStock)

          this.outOfStockAmount = this.outOfStock.length



          this.prices.map(e=>console.log(e))
        })
   
    this.switchHandle()

  }
  //)}
  async getSales(){

    this.orderServ.getAllOrders()
    this.orderServ.ordersdata.subscribe(e=>
      {                 
        /**orders data  */
          this.arrOrders.push(e)
        this.totalOrders = this.arrOrders.length
        let pending =this.arrOrders.filter(e=>e.deliveredstatus=='pending')
        let arrived = this.arrOrders.filter(e=>e.deliveredstatus == 'delivered' )
             this.arrOrders.filter(e=>e.deliveredstatus == 'shipping' ).map(
               e=> arrived.push(e)
             )
             
            
            this.prices.push(e.total)
             this.pendingNo = pending.length
             this.deliverNo = arrived.length

          if(typeof(e.total) == 'number')
            {
              
              this.sales+=e.total
              this.revenue=this.sales*0.9
            }

            }) 
            this.arrOrders.pop()
            this.prices.pop()
             this.prices.map(e=>
             { 
       console.log(e)
     this.price=e
       
      console.log(this.sales)}
    )
           console.log(this.prices)


     /*   this.prices.map(e=>
       {   this.sales+=e
          this.revenue=this.sales*0.9
          console.log(e, "rottern here")
        }
          
          )*/
  }
  switchHandle() {
    if (this.decide == 'EN') {
      this.langDet = !this.langDet
      let styled = document.getElementsByTagName('div')
      this.mysales = this.lang.salesEn
      this.waitingShip = this.lang.waitingEn;
      this.trdersShipped = this.lang.shippedEn;
      this.trderHistory = this.lang.historyEn;
      this.totalSales = this.lang.salesEn;
      this.totalRevenue = this.lang.revEn;
      this.salesHistory = this.lang.saleHistEn;
      this.myProds = this.lang.productsEn;
      this.activProds = this.lang.activeEn;
      this.outStock = this.lang.outEn;
      this.sellNow = this.lang.sellEn;
      if (styled.length != 0) {
        for (let i = 0; i <= styled.length; i++) {
          styled[i].style.direction = 'ltr'
        }
      }




    } else if (this.decide == 'AR') {
      let styled = document.getElementsByTagName('div')
      this.mysales = this.lang.salesAr
      this.waitingShip = this.lang.waitingAr;
      this.trdersShipped = this.lang.shippedAr;
      this.trderHistory = this.lang.historyAr;
      this.totalSales = this.lang.salesAr;
      this.totalRevenue = this.lang.revAr;
      this.salesHistory = this.lang.salesHistAr;
      this.myProds = this.lang.productsAr;
      this.activProds = this.lang.activeAr;
      this.outStock = this.lang.outAr;
      this.sellNow = this.lang.sellAr;
      if (styled.length != 0) {
        for (let i = 0; i <= styled.length; i++) {
          styled[i].style.direction = 'rtl'
        }
      }


    }
  }
}