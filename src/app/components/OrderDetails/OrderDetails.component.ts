import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/Service/orders.service';
import { BehaviorSubject, Observable } from 'rxjs';
import {Orders} from '../../ViewModel/orders'
import { OrderData } from 'src/app/ViewModel/order-data';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-OrderDetails',
  templateUrl: './OrderDetails.component.html',
  styleUrls: ['./OrderDetails.component.scss']
})
export class OrderDetailsComponent implements OnInit {
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
  constructor(private orderServ: OrdersService,private ActivatedRouteServ:ActivatedRoute,) { }

 async ngOnInit() {
  console.log(this.ActivatedRouteServ.queryParams['_value'].type);

    this.decide = localStorage.getItem('lang')
    await this.getOrdersData()
  }



  async getOrdersData(){
    this.orderServ.getAllOrders()
    this.orderServ.ordersdata.subscribe(e=>
      {  
    if(this.ActivatedRouteServ.queryParams['_value'].type == 'shipped'){
 
      if(e.deliveredstatus='pending'){
        this.orders.push(e)
        console.log(this.arrOorders)
      }
    } else if(this.ActivatedRouteServ.queryParams['_value'].type == 'pending')
      {
        if(e.deliveredstatus='delivered'){

          this.orders.push(e)
          console.log(this.arrOorders)
        }
      }


  })
  this.arrOorders.pop()
  console.log(this.arrOorders)

  }

}
