import { Component, OnInit } from '@angular/core';
import{SalesService}from '../../Service/sales.service';
import {Sales} from './../../ViewModel/sales';
import { groupBy, Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { OrdersService } from 'src/app/Service/orders.service';
import { OrderData } from 'src/app/ViewModel/order-data';
import { MatTableModule } from '@angular/material/table';
import { MatFormField } from '@angular/material/form-field';
import { map } from '@firebase/util';
import{SalesLang} from './sales-lang'
@Component({
  selector: 'app-my-selles',
  templateUrl: './my-selles.component.html',
  styleUrls: ['./my-selles.component.scss']
})
export class MySellesComponent implements OnInit {
  Sales:Observable<Sales[]>;
  sales:Sales
  sets:Sales[]=[{}]
  finalDates:string[]=[]
  arr:number[]=[]
  salesData:Sales[]=[]
  data = new MatTableDataSource(this.salesData)
  salesArr:OrderData[]=[]
  dateArr:string[]=[]
  dateArr2:string[]=[]
  dateArr3:string[]=[]
  saled:number=0
  total:Sales[]=[]
  date:string=''
  decide:string=''
  lang: SalesLang;
  dailysalles:string
  datelang:string
  saleslang:string
  langDet:boolean=false 
  searchplace:string

  constructor(salesServ:SalesService, private orderServ: OrdersService) {
    this.lang={
      dailysallesAR:'مبيعاتي اليومية',
    dateAR:'التاريخ',
    salesAR:'المبيعات',
    dailysallesEN:'My Daily Sales',
    dateEN:'Date',
    salesEN:'Sales',
    searchplaceEN:'Enter Date',
    searchplaceAR:'ادخل التاريخ',

    }
   // this.Sales=salesServ.getAllSales()
   }

  async ngOnInit() {
    this.decide = localStorage.getItem('lang')
    console.log(this.decide)
    if (this.decide == null) {
      this.dailysalles=this.lang.dailysallesEN
      this.datelang=this.lang.dateEN
      this.saleslang=this.lang.salesEN
      this.searchplace=this.lang.searchplaceEN
    }

     // await this.groupBy(list, keyGetter)
      
     /*this.orderServ.salesDataArr.subscribe(async e=>{
       this.salesData=await e
       this.salesData.map(r=>{
         this.dateArr.push(r.salesDate)
         console.log(r.salesDate)
        })
      })*/
      let salesData:Sales[]=[]
      this.orderServ.getAllOrders()
      this.orderServ.ordersdata.subscribe((e)=>
      { 
        
        if(typeof(e.date)== 'string'){
          salesData.push({salesDate: e.date, Sales: e.total})
          console.log(this.salesData)
          this.dateArr.push(e.date)
          console.log(this.dateArr)
          this.dateArr2 =  this.dateArr
        }  
        
        this.dateArr3 = this.dateArr.slice().sort()
        console.log(this.dateArr3)
        this.finalDates=[]
        for (let i=0; i<this.dateArr3.length; i++){
          console.log(this.dateArr3[i], 695)
          if(this.dateArr3[i]!=this.dateArr3[i+1]){
            this.finalDates.push(this.dateArr3[i])
          }
          console.log(this.finalDates)
        }
        
        
        
        this.sets=[]
        this.finalDates.map(e=>{
          let date=e
          let sales=0
          
          salesData.map(s=>{
            if (s.salesDate==date){
              sales+=s.Sales
              this.sets.push({salesDate: date, Sales: sales})
            }
          })
        })
        console.log(this.sets)
        this.total=[]
        for( let i=0; i<this.sets.length; i++){
          if(i!=this.sets.length-1){
            if(this.sets[i].salesDate!=this.sets[i+1].salesDate){
              this.total.push(this.sets[i])
            }
          } else{
            this.total.push(this.sets[i])
          }
        }
      
        console.log(this.total)})
        salesData.pop()
        
        // this.saled= e.total
        //  this.date=e.date
        /*   if(this.saled!=0){
          let salesDay: Sales = {salesDate: this.date, Sales: this.saled }
          this.total.push(salesDay)
          let saled = 0
          console.log(this.salesData)
        }
        this.wait() 
        console.log(this.salesData)
        
        /* let out =  this.salesData.reduce((entryMap, e)=>entryMap.set(e.salesDate, {...entryMap.get(e.salesDate)||{},...e}), new Map()).values()
        this.tot.push(out.next().value) 
        for (let j=this.dateArr2.length; j>-1; j--){
          if(this.dateArr2[j]==this.dateArr2[j-1]){
            console.log(this.dateArr2[j])
            //this.dateArr2.splice(this.dateArr2[j],1)
          }
        }*/
        /* this.dateArr2.map(e=>{
          if(e!= e+1){
            this.finalDates.push(e)
          }
        })*/
        
        /* this.salesData.map(e=>{
          if(e.salesDate == this.date){
            saled += e.Sales
            this.arr.push(saled)
            console.log(saled)
            if(e.salesDate == this.date){
              this.arr.pop()
            } 
          } else if(e.salesDate!= this.date){
            let notSelled = 0
            notSelled+=e.Sales
            this.arr.push(notSelled)
          }
          console.log(this.arr)
        })*/
        
        
        
        /*this.dateArr.map(e=>{
          
          this.orderServ.ordersdata.subscribe(e=>{
            if(this.date == e.date && e.total!=0){
              saled += e.total
              console.log(this.date, e.date, )
            }
            console.log(saled, this.date)
          })})*/
          
          
          // this.data.filter = e
          
          
          
          
          
          //const sets = groupBy(this.salesData, saled => saled.Date)
          // console.log(sets.get(this.date))
          this.switchHandle()

        }
        
        
        
        
        
        switchHandle() {
          if (this.decide == 'EN') {
            this.langDet = !this.langDet
            let styled = document.getElementsByTagName('div')
            this.dailysalles=this.lang.dailysallesEN
      this.datelang=this.lang.dateEN
      this.saleslang=this.lang.salesEN
      this.searchplace=this.lang.searchplaceEN
      if (styled.length != 0) {
        for (let i = 0; i <= styled.length; i++) {
         // styled[i].style.direction = 'ltr'
        }
      }
    } else if (this.decide == 'AR') {
      let styled = document.getElementsByTagName('div')
      this.dailysalles=this.lang.dailysallesAR
      this.datelang=this.lang.dateAR
      this.saleslang=this.lang.salesAR
      this.searchplace=this.lang.searchplaceAR
      if (styled.length != 0) {
        for (let i = 0; i <= styled.length; i++) {
          styled[i].style.direction = 'rtl'
        }
      }
    }
  }
}
