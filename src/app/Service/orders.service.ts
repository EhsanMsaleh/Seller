import { Injectable } from '@angular/core';
import{Orders} from '../ViewModel/orders';
import { Firestore, collectionData, collection,collectionGroup, where,query } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  Order:Observable<Orders[]>;
  constructor(private firestore: Firestore) {
    const collectionseller:any = collection(firestore, 'Orders');
    this.Order = collectionData(collectionseller);
   }

   getAllOrders(): Observable<Orders[]>{
    const collectionseller:any = collection(this.firestore, 'Orders');
     this. Order = collectionData(collectionseller);
     return this. Order
  }
}
