import {
  Firestore, addDoc, collection, collectionData,
  doc, docData, deleteDoc, updateDoc, DocumentReference,where, setDoc, getDocs, query, getFirestore, getDoc
} from '@angular/fire/firestore';
import {AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {IProduct} from '../ViewModel/product';

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
      // }) 
      // console.log(this.Product)
      // return this.db.collection<IProduct>('Products', (ref)=>ref.where(fir.default.firestore.FieldPath.documentId(), 'in',this.Product)).snapshotChanges() 
    //  return this.db.collection<ISeller>('users')
    //  .doc('GJdYZoixIgn7krJLNZWV').get().subscribe((res)=>{
    //    var res2 = res.data();
    //    res2?.Product?.map((el)=>{el.Product_Id.get().then((prd)=>{
    //      this.prod.next(prd.data() as IProduct)
    //      console.log(this.prod)
    //     })
    //   })
    //   console.log(this.Product)
     // return this.db.collection<IProduct>('Products', (ref)=>ref.where(fir.default.firestore.FieldPath.documentId(), 'in',this.Product)).snapshotChanges()
     
    //try to get data from product collection by ref sellerid
    this.db.collection("Products").snapshotChanges()
  let sid=doc(this.firestore,'users','GJdYZoixIgn7krJLNZWV')
  return   this.db.collection<IProduct>('Products', ref => ref.where('SellerID', '==', sid)).snapshotChanges()


   // const allprods= collectionData(p) as Observable<IProduct[]>
//    let sid=doc(this.firestore,'users','GJdYZoixIgn7krJLNZWV')
//     let res = this.db.collection<IProduct>('Products', ref => ref.where('SellerID', '==', sid))
// .snapshotChanges()
// .subscribe(
// // data=>{this.result=data}
// //this.prod.next(e); this.result=e; this.resarr.push(this.result);
//   data =>{   this.resarr=data.map((el)=>{

//     return{
//       id:el.payload.doc.id,
//       ...(el.payload.doc.data())

//     }
//     console.log(this.resarr)
//   })
//     })



// console.log(this.resarr)

//return res

  //   allprods.subscribe(e=>{e.map((e)=>{

  //    if(e.SellerID=doc(this.firestore,'users','SZREo5iMzjFm2lC35dz3'))

  //    {
  //      this.db.collection<IProduct>('Products').doc(e.id).get()
  //    .subscribe((res)=>{var res2 = res.data();
  //    console.log(res2)
  //   })
  // }
  //   })})
  //   console.log()
    //////////////////

    //  return this.db.collection<ISeller>('users')
    //  .doc('GJdYZoixIgn7krJLNZWV').get().subscribe((res)=>{
    //    var res2 = res.data();
    //    res2?.Product?.map((el)=>{el.Product_Id.get().then((prd)=>{
    //      this.prod.next(prd.data() as IProduct)
    //     })

    //   })
    //  })

  }
 
//to try later
  // getBooks(): Observable<IBook[]> {
  //   const booksRef = collection(this.firestore, 'books');
  //   return collectionData(booksRef, { idField: 'id' }) as Observable<IBook[]>;
  // }


  mainPageData(){
    this.db.collection("Products").snapshotChanges()
    let sid=doc(this.firestore,'users','GJdYZoixIgn7krJLNZWV')
    
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
 //return this.db.collection<IProduct>('Products',(ref)=>ref.where('searchKey','array-contains',search).limit(5)).valueChanges();
 return this.db.collection<IProduct>('Products',(ref)=>ref.where(fir.default.firestore.FieldPath.documentId(), 'in',this.Product).where('searchKey','array-contains',search).limit(5)).valueChanges();


}

}
