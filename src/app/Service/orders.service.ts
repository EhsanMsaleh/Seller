import { Injectable } from '@angular/core';
import{Orders} from '../ViewModel/orders';
import { Firestore, collectionData, collection,collectionGroup, where,query } from '@angular/fire/firestore';
import { Observable, BehaviorSubject } from 'rxjs';
import { IProduct } from '../ViewModel/product';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ISeller } from '../ViewModel/user';
import { Seller } from '../ViewModel/seller';
import { throws } from 'assert';
@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  Order:Observable<Orders[]>;
  //name:IProduct=''
  orderIds:[]=[]
  prodsId:IProduct[]=[]
  arr:IProduct[]=[]
  loggedToken:string=''
  quant:number=0
  orderSeller= new  BehaviorSubject<IProduct>({});

  orderBuyer = new BehaviorSubject<string>('')
  pending= new BehaviorSubject<number>(0)
  delivered= new BehaviorSubject<number>(1)
  orderDate = new BehaviorSubject<string>('')
  ordrslr = new BehaviorSubject<ISeller>({})
  price = new BehaviorSubject<number>(0)
  prodName = new BehaviorSubject<string>('')
  prodNameAr = new BehaviorSubject<string>('')
  buyer: string=''
  deliver:boolean;
  pend:boolean
  quantity = new BehaviorSubject<number>(0)

  constructor(private firestore: Firestore, private db: AngularFirestore) {
    const collectionseller:any = collection(firestore, 'Orders');
    this.Order = collectionData(collectionseller);
   }


   getBuyerName(){
    this.loggedToken='Q14GIMGalzdzZuXBTtFql0WxjTh1'
    const q = collection(this.firestore, 'Orders')
    
    const allOrders = collectionData(q) as Observable<Orders[]>
    
   return  allOrders.subscribe(e=>e.map((e)=>{
     let buyer = e.buyer.id
      this.pend = e.status
      console.log(this.pend)
     e?.Product.map((e)=>{
       
      let stat =e?.Seller_ID

      
     if(stat == this.loggedToken){
        if(this.pend == true){
          console.log(this.pend, "when true")
          this.delivered.next(1)
          console.log(this.deliver)
        } else if (this.pend==false){
          this.pending.next(0)
          console.log(this.pend, "whenfasle")
          console.log(this.pending)
        }
     // this.buyer=buyer

      let final =  this.db.collection<ISeller>('users')
      .doc(`${buyer}`).get().subscribe((res)=>{
        var res2 = res.data();
       this.buyer = res2?.firstname
         this.orderBuyer.next(this.buyer)
 
        
        return final
      })
     }
   })
      }))
   }

  /* getNotDelivered(){
    this.loggedToken='CQ2voW1BMJjMI7FT6KLV'
    const q = collection(this.firestore, 'Orders')
    
    const allOrders = collectionData(q) as Observable<Orders[]>
    
   return  allOrders.subscribe(e=>e.map((e)=>{
    
     this.pend = e.status
    console.log(e.status)
     if(this.pend == false){
        e?.Product.map((e)=>{
       
      let stat =e?.Seller_ID
        console.log(e.Seller_ID)
     if(stat == this.loggedToken){
      
     
     }
   })
  }
      })
      )}
   
   getDelivered(){
    this.loggedToken='CQ2voW1BMJjMI7FT6KLV'
    const q = collection(this.firestore, 'Orders')
    
    const allOrders = collectionData(q) as Observable<Orders[]>
    
   return  allOrders.subscribe(e=>e.map((e)=>{
    
     this.deliver = e.status
     if(this.deliver == true){
     e?.Product.map((e)=>{
       
      let stat =e?.Seller_ID
        console.log(e.Seller_ID)
     if(stat == this.loggedToken){
      this.delivered.next(this.deliver)
     
     }
   })
  }
      })
      )}
   */




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

    this.loggedToken='Q14GIMGalzdzZuXBTtFql0WxjTh1'

     const q = collection(this.firestore, 'Orders')
     
     const allOrders = collectionData(q) as Observable<Orders[]>
  
    return  allOrders.subscribe(e=>e.map((e)=>{
      /**date */
      let date = e.date
     let bye = e.buyer
      e.Product.map(e=>{
        /**quantity */
        let quant = e.Product_Quntity
        
         

        
        let stat =e.Seller_ID

      if(stat == this.loggedToken){
        /**quantity & date */
        this.quantity.next(quant)
        this.orderDate.next(date)

   
       let prodIds = e.Product_Id.id
  
       this.db.collection<IProduct>('Products').doc(`${prodIds}`).get().subscribe(
         (d)=>{let d2 = d.data(); this.price.next(d2.Price*quant)
            this.prodName.next(d2.Name)
            this.prodNameAr.next(d2.NameAr)
        }
       )
      }
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
        })})Plus90+90
        })
        }
        //this.db.collection<IProduct>('Products').doc(
        ))*/
    
  }

}
