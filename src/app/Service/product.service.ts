import {
  Firestore, addDoc, collection, collectionData,
  doc, docData, deleteDoc, updateDoc, DocumentReference,where, setDoc
} from '@angular/fire/firestore';
import {AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {IProduct} from '../ViewModel/product';

import { ISeller } from '../ViewModel/user';
import {AngularFirestore, } from '@angular/fire/compat/firestore'
import {AngularFireAction,} from '@angular/fire/compat/database'
import * as fir from 'firebase/compat/app'
@Injectable({ 
  providedIn: 'root'
})
export class ProductService {
  Product:Observable<IProduct[]>;
  User!:Observable<AngularFireAction<firebase.default.database.DataSnapshot>[]> ;
  
    prod= new  BehaviorSubject<IProduct>({});

  constructor(private firestore: Firestore, private db: AngularFirestore) { 

  }

  
  getAllproduct(){
    /*const collectionseller:any = collection(this.firestore, 'Products');

     this. Product = collectionData(collectionseller,{idField:'id'}) as Observable<IProduct[]>;
     return this. Product

    const user =this.db.collection<ISeller>('users').doc('SZREo5iMzjFm2lC35dz3').snapshotChanges()
    
        user.subscribe((prd)=>{
        let gotProd:any =prd.payload.data().Product
      this.Product = gotProd.map(e=> e.Product_Id.id) as Observable<IProduct[]>;
      console.log(this.Product)
      }) 
      console.log(this.Product)
      return this.db.collection<IProduct>('Products', (ref)=>ref.where(fir.default.firestore.FieldPath.documentId(), 'in',this.Product)).snapshotChanges() 
     */
     
     return this.db.collection<ISeller>('users')
     .doc('GJdYZoixIgn7krJLNZWV').get().subscribe((res)=>{
       var res2 = res.data();
       res2?.Product?.map((el)=>{el.Product_Id.get().then((prd)=>{
         this.prod.next(prd.data() as IProduct)
        })
       
      })
     })

  }
//to try later
  // getBooks(): Observable<IBook[]> {
  //   const booksRef = collection(this.firestore, 'books');
  //   return collectionData(booksRef, { idField: 'id' }) as Observable<IBook[]>;
  // }
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
 return this.db.collection<IProduct>('Products',(ref)=>ref.where('searchKey','array-contains',search).limit(5)).valueChanges();
}

}
