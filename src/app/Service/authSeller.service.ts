import { ISeller } from './../ViewModel/user';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable } from 'rxjs';
import {
  Firestore, addDoc, collection, collectionData,
  doc, docData, deleteDoc, updateDoc, DocumentReference,where, setDoc, getDocs, query, getFirestore, getDoc, collectionGroup
} from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Injectable({
  providedIn: 'root'
})
export class AuthSellerService {
private IslogSub: BehaviorSubject<boolean>;

sellerId:string;
errMas:string='';
sellerEmail:string|null;
constructor(private auth:AngularFireAuth,private firestore: Firestore, private db: AngularFirestore) {
  this.IslogSub=new BehaviorSubject<boolean> (this.IsUserLogged);

 }


get IsUserLogged():boolean
{
  return  (localStorage.getItem('TOKEN'))? true: false
}

getloggedStatus(): Observable<boolean>
  {
    return this.IslogSub.asObservable();
  }
  getSellerId(){
  return  localStorage.getItem('id').replace(/"/g, '')
  }
  // getSellerById(id:string): Observable<ISeller>{
    
  //    return this.db.collection<ISeller>('Seller').doc(id).valueChanges()
     
  // }
  getSellerById(){
    let id = localStorage.getItem('id');
    // const ProdDocRef = doc(this.firestore, `Seller/${id}`)
    // return docData(ProdDocRef, { idField: 'id' }) as Observable<ISeller>;
   // let id = localStorage.getItem('id');
  // return  this.db.collection<ISeller>('Seller').valueChanges()
  const collectionseller:any = collection(this.firestore, 'Seller');
    return collectionData(collectionseller);
     
   
   
  }

}
