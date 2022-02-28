import { Firestore, collectionData, collection,collectionGroup, where,query } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {ISeller} from '../ViewModel/user';
import { timeStamp } from 'console';
@Injectable({
  providedIn: 'root'
})
export class SellerService {
  Seller: Observable<ISeller[]>;
  User: Observable<ISeller[]>;

  constructor(private firestore: Firestore) { 
    const collectionseller:any = collection(firestore, 'users');
    this.Seller = collectionData(collectionseller);
    this.User= collectionData(collectionseller);
  }
  


 
  getAlluser(): Observable<ISeller[]>{
    const collectionseller:any = collection(this.firestore, 'users');
     this. User = collectionData(collectionseller);
     return this. User
  }

  getAllseller():Observable<ISeller[]>{
     const collectionseller:any = collectionGroup(this.firestore, 'users')

   // this.Seller = query(collectionseller,where("isSeller" , "==" ,"true" ));
   return this.Seller
     
  }
  getProdSeller(id:any)
  {
    const collectionseller:any = collectionGroup(this.firestore, 'Products')
    query(collectionseller,where("SellerID" , "==" ,id ));
  }
}
 