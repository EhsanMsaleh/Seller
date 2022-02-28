import { Firestore, collectionData, collection,collectionGroup, where,query } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import{Sales}from '../ViewModel/sales';

@Injectable({ 
  providedIn: 'root'
})
export class SalesService { 
  Sales:Observable<Sales[]>;
  constructor(private firestore: Firestore) {
    const collectionseller:any = collection(firestore, 'Daily_Sales');
    this.Sales = collectionData(collectionseller);
   }

   getAllSales(): Observable<Sales[]>{
    const collectionseller:any = collection(this.firestore, 'Daily_Sales');
     this. Sales = collectionData(collectionseller);
     return this. Sales
  }
}
