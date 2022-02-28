import {
  Firestore, addDoc, collection, collectionData,
  doc, docData, deleteDoc, updateDoc, DocumentReference,where, setDoc
} from '@angular/fire/firestore';
import {AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {IProduct} from '../ViewModel/product';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
Product:Observable<IProduct[]>;
  constructor(private firestore: Firestore, private db:AngularFirestore) {
    const collectionseller:any = collection(firestore, 'Products');
    this.Product = collectionData(collectionseller);
  }


  getAllproduct(): Observable<IProduct[]>{
    const collectionseller:any = collection(this.firestore, 'Products');
     this. Product = collectionData(collectionseller,{idField:'id'}) as Observable<IProduct[]>;
     return this. Product
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
