import { Firestore, collectionData, collection,collectionGroup, where,query, getDocs } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthSellerService } from 'src/app/Service/authSeller.service';

import {ISeller} from '../ViewModel/user';
import { timeStamp } from 'console';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAction } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  Seller!: Observable<ISeller[]>;
  User: Observable<ISeller[]>;
  Name= new BehaviorSubject('')
  constructor(private firestore: Firestore, private db: AngularFirestore, private sellerServ: AuthSellerService) { 
    const collectionseller:any = collection(firestore, 'Seller');
    this.Seller = collectionData(collectionseller);
    const collectiongr = collection(firestore, 'Seller')
   // this.User= collectionData(collectiongr);
    
  }
  
  

  getSellerId(){
    
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
  getSellerData(){
   /*const seller = this.db.collection<ISeller>('users').doc('GJdYZoixIgn7krJLNZWV').snapshotChanges();
   seller.subscribe((d)=>{
     let sellerData:any = d.payload.data().firstname
     console.log(sellerData)
     this.Name = sellerData 
   })
   console.log(this.Name)
   return this.Name;*/
let id=this.sellerServ.getSellerId()
    this.db.collection<ISeller>('Seller')
     .doc(id).get().subscribe((res)=>{
       var res2 =  res.data().firstname;

       
      this.Name.next( res2)
      })
      this.Name
    return  this.Name
}
getdetails(){
  let id=this.sellerServ.getSellerId()
  this.db.collection<ISeller>('Seller')
  .doc(id).get().subscribe((res)=>{
    var res2 =  res.data().firstname;

    
   this.Name.next( res2)
   })
   this.Name
 return  this.Name
}
  getProdSeller(id:any)
  {
    const collectionseller:any = collectionGroup(this.firestore, 'Products')
    query(collectionseller,where("SellerID" , "==" ,id ));
  }

  
}
 