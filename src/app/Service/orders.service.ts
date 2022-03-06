import { Injectable } from '@angular/core';
import{Orders} from '../ViewModel/orders';
import { Firestore, collectionData, collection,collectionGroup, where,query } from '@angular/fire/firestore';
import { Observable, BehaviorSubject } from 'rxjs';
import { IProduct } from '../ViewModel/product';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ISeller } from '../ViewModel/user';
import { Seller } from '../ViewModel/seller';
@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  Order:Observable<Orders[]>;
  //name:IProduct=''
  
  prodsId:IProduct[]=[]
  arr:IProduct[]=[]
  loggedToken:string=''
  orderSeller= new  BehaviorSubject<IProduct>({});
 // ordrslr = new BehaviorSubject<ISeller>({})
  constructor(private firestore: Firestore, private db: AngularFirestore) {
    const collectionseller:any = collection(firestore, 'Orders');
    this.Order = collectionData(collectionseller);
   }

   getAllOrders(){
    /*const collectionseller:any = collection(this.firestore, 'Orders');
     this. Order = collectionData(collectionseller);
     return this. Order
     
     : Observable<Orders[]>
     */

    /* return this.db.collection<Orders>('Orders')
     .doc('1CkOPEtNtUVewwzVA8Of').get().subscribe((res)=>{
       var res2 = res.data();
       res2?.Product?.map((el)=>{el.Product_Id.get().then((prd)=>{
        this.orderSeller.next(prd.data() as IProduct)
       })

    })
     })*/

    this.loggedToken='CQ2voW1BMJjMI7FT6KLV'
     const q = collection(this.firestore, 'Orders')
     
     const allOrders = collectionData(q) as Observable<Orders[]>
  
    return  allOrders.subscribe(e=>e.map((e)=>{
       e.Product.map(e=>{let stat =e.Seller_ID
        console.log(e.Seller_ID)
      if(stat == this.loggedToken){
       console.log(e.Product_Id.id)}
      })
       }))
        /*.map((el)=>{
        const hopa: any=  el.Product_Id.id.toString()
        this.prodsId.push(hopa)
        console.log(allOrders)
        this.prodsId.map((e)=>{let prodID=e;
        this.db.collection<IProduct>('Products').doc(`${prodID}`).get().subscribe(
          (res)=>{var res2:any = res.data();
            this.arr.push(res2)
          res2.SellerID?.get().then((usr)=>{this.ordrslr.next(usr.data() as ISeller)
            
            });
          console.log(this.ordrslr, res2.Name)
        })})
        })
        }
        //this.db.collection<IProduct>('Products').doc(
        ))*/
    
  }

}
