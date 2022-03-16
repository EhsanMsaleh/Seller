import { Firestore, collectionData, collection,collectionGroup, where,query, getDocs } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthSellerService } from 'src/app/Service/authSeller.service';
import {Seller} from '../ViewModel/seller';

import { timeStamp } from 'console';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAction } from '@angular/fire/compat/database';
import * as fir from 'firebase/compat/app';
@Injectable({
  providedIn: 'root'
})
export class SellerService {
  Seller!: Observable<Seller[]>;
  User: Observable<Seller[]>;
  Name= new BehaviorSubject('')
  IsActive:boolean
  constructor(private firestore: Firestore, private db: AngularFirestore, private sellerServ: AuthSellerService) { 
    const collectionseller:any = collection(firestore, 'Seller');
    this.Seller = collectionData(collectionseller);
    const collectiongr = collection(firestore, 'Seller')
   // this.User= collectionData(collectiongr);
    
  }
  
  


 
  getAlluser(): Observable<any[]>{

    const collectionseller:any = collection(this.firestore, 'users');
     this. User = collectionData(collectionseller)
     return this. User
  }

  getAllseller():Observable<Seller[]>{
    const coll= this.db.collection<Seller>('Seller').valueChanges()
     const collectionseller:any = collectionGroup(this.firestore, 'Seller')
     this.Seller = collectionData(collectionseller)
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
    this.db.collection<Seller>('Seller')
     .doc(id).get().subscribe((res)=>{
       var res2 =  res.data().FirstName;

       
      this.Name.next( res2)
      })
      this.Name
    return  this.Name
}
getdetails(){
  let id=this.sellerServ.getSellerId()
  this.db.collection<Seller>('Seller')
  .doc(id).get().subscribe((res)=>{
    var res2 =  res.data().FirstName;

    
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

  checkSeller(id:string)
  {
    //fir to see ids
  return  this.db.collection('Seller' , ref=>ref.where(fir.default.firestore.FieldPath.documentId(), '==' , id)).valueChanges();
  }
  ISActive() 
{
  let idl = localStorage.getItem('id');
  let id= JSON.parse(idl)
  this.db.collection<Seller>('Seller').doc(id).valueChanges().subscribe((e) => {
    console.log(e);
    this.IsActive= e.IsActive;
  });

 return this.IsActive;
}
}
 