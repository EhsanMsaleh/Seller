import {
  Firestore, addDoc, collection, collectionData,
  doc, docData, deleteDoc, updateDoc, DocumentReference,where, setDoc, getDocs, query, getFirestore, getDoc
} from '@angular/fire/firestore';
import {AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {IProduct} from '../ViewModel/product';
import { AuthSellerService } from 'src/app/Service/authSeller.service';

import { ISeller } from '../ViewModel/user';
import {AngularFireAction, AngularFireList,} from '@angular/fire/compat/database'
import * as fir from 'firebase/compat/app'
import { FirebaseApp, FirebaseAppModule, FirebaseApps } from '@angular/fire/app';
 
@Injectable({




 providedIn: 'root'
})
export class ProductService {
  Product:Observable<IProduct[]>;
 resarr:IProduct[]=[];
 result:IProduct;
  User!:Observable<AngularFireAction<firebase.default.database.DataSnapshot>[]> ;
  prod= new  BehaviorSubject<IProduct>({});
  prodarr= new  BehaviorSubject<IProduct[]>([]);
  Producty!:Observable<AngularFireAction<firebase.default.database.DataSnapshot>[]>
arr:[]=[]
   

 
 
  constructor(private firestore: Firestore, private db: AngularFirestore,private sellerServ: AuthSellerService) { 


  }


  getAllproduct(){
   
      
    //try to get data from product collection by ref sellerid
    this.db.collection("Products").snapshotChanges()
    let id=this.sellerServ.getSellerId()

  let sid=doc(this.firestore,'Seller',id)
  return   this.db.collection<IProduct>('Products', ref => ref.where('SellerID', '==', sid)).snapshotChanges()


  
   

  }



  mainPageData(){
    this.db.collection("Products").snapshotChanges()
    let id=this.sellerServ.getSellerId()
    let sid=doc(this.firestore,'Seller',id)
    
    const him =   this.db.collection<IProduct>('Products', ref => ref.where('SellerID', '==', sid)).snapshotChanges()
    console.log(him)

    return him
  } 
  addNewprod(NewProd:IProduct)
  {
    const collectionsellerRef:any = collection(this.firestore, 'Products');
    return addDoc(collectionsellerRef, NewProd);

  }

  deleteProd(prod: IProduct) {
    const ProdDocRef = doc(this.firestore, `Products/${prod.id}`);
    return deleteDoc(ProdDocRef);
}
getProdByID(id: any) {
  const ProdDocRef = doc(this.firestore, `Products/${id}`);
  return docData(ProdDocRef, { idField: 'id' }) as Observable<IProduct>;
  // return this.db.collection('Products').doc(`${id}`).valueChanges();
}

updateProd(Prod: IProduct) {
  const ProdDocRef = doc(this.firestore, `Products/${Prod.id}`);
  return setDoc(ProdDocRef, Prod);
}

searchByName(search:string)
{
  let idl = localStorage.getItem('id');
  let id= JSON.parse(idl)
 //return this.db.collection<IProduct>('Products',(ref)=>ref.where('searchKey','array-contains',search).limit(5)).valueChanges();
 return this.db.collection<IProduct>('Products',(ref)=>ref.where('SellerID','==',id).where('searchKey','array-contains',search).limit(5)).valueChanges();


}

}