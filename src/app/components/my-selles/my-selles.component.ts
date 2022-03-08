import { Component, OnInit } from '@angular/core';
import{SalesService}from '../../Service/sales.service';
import {Sales} from './../../ViewModel/sales';
import { groupBy, Observable } from 'rxjs';

import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { OrdersService } from 'src/app/Service/orders.service';
import { OrderData } from 'src/app/ViewModel/order-data';
@Component({
  selector: 'app-my-selles',
  templateUrl: './my-selles.component.html',
  styleUrls: ['./my-selles.component.scss']
})
export class MySellesComponent implements OnInit {
  Sales:Observable<Sales[]>;
  sales:Sales
  salesArr:OrderData[]=[]
  dateArr:string[]
  saled:number=0
  tot:OrderData[]=[]
  date:string
  constructor(salesServ:SalesService, private orderServ: OrdersService) {
   // this.Sales=salesServ.getAllSales()
   }

  async ngOnInit() {
     // await this.groupBy(list, keyGetter)
      await this.wait()
  }

  async wait(){
    this.orderServ.getAllOrders()
     
      this.orderServ.ordersdata.subscribe(e=>
        { 
            
            console.log(e)
          const grouped = this.salesArr.reduce((acc, value)=>
            {
              if(!acc[value.date]){
                acc[value.total]=[]
              }
              acc[value.total].push(value.total)
              return acc
            },{}
            )
          /*console.log(e.date)
            this.salesArr.push(e)
            this.date = e.date
            console.log(this.date)
            //this.dateArr.push(this.date)
            console.log(this.salesArr)
             /* this.dateArr.map(e=>{
                let searchedDate = e
               this.tot = this.salesArr.filter(e=>e.date == searchedDate)
               console.log(this.tot)
              })*/
            
              console.log(grouped.date)
            })
  }

    
}
