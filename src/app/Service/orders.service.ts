import { Injectable } from '@angular/core';
import{Orders} from '../ViewModel/orders';
import { Firestore, collectionData, collection,collectionGroup, where,query } from '@angular/fire/firestore';
import { Observable, BehaviorSubject } from 'rxjs';
import { IProduct } from '../ViewModel/product';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ISeller } from '../ViewModel/user';
import { Seller } from '../ViewModel/seller';
import { throws } from 'assert';
import { SellerService } from './seller.service';
import { AuthSellerService } from './authSeller.service';
import { OrderData } from '../ViewModel/order-data';
import { Sales } from '../ViewModel/sales';
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
  id:string=''
  /*orderSeller= new  BehaviorSubject<IProduct>({});
  orderBuyer = new BehaviorSubject<string>('')
  pending= new BehaviorSubject<number>(0)
  delivered= new BehaviorSubject<number>(1)
  orderDate = new BehaviorSubject<string>('')
  ordrslr = new BehaviorSubject<Seller>({})
  price = new BehaviorSubject<number>(0)
  prodName = new BehaviorSubject<string>('')
  prodNameAr = new BehaviorSubject<string>('')
  quantity = new BehaviorSubject<number>(0)*/
  deliver:boolean;
  pend:boolean
  buyer: string=''
  
  orderSeller:string = ''
  orderBuyer :string = ''
  pending : string =''
  delivered: boolean=true;
  deliverStat:boolean;
  orderDate :string = ''
  ordrslr:string = ''
  price :number = 0
  prodName :string = ''
  prodNameAr: string = ''
  arrlength:number=0
  arra:any[]=[]
  quantity:number = 0
  data:OrderData;
  sales:Sales
  salesData = new BehaviorSubject<Sales>({})
  ordersdata  = new BehaviorSubject<OrderData>({})
  constructor(private firestore: Firestore, private db: AngularFirestore, private sellerServ: AuthSellerService) {
    const collectionseller:any = collection(firestore, 'Orders');
    this.Order = collectionData(collectionseller);
   }

   /*getLength(){
    this.id=this.sellerServ.getSellerId().toString()
    console.log(this.id)
   this.loggedToken=this.id
    console.log(this.loggedToken)
    const q = collection(this.firestore, 'Orders')
    
    const allOrders = collectionData(q) as Observable<Orders[]>
 
   return  allOrders.subscribe(e=>e.map((e)=>{
     


     e.Product.map(e=>{
       /**quantity 
       let quant = e.Product_Quntity

       let stat =e.Seller_ID
       console.log(stat)
     if(stat = this.loggedToken){
       /**quantity & date 
       this.quantity=quant

       this.arra.push(this.quantity)
      this.arrlength = this.arra.length
    }  
    console.log(this.arrlength)
      return this.arrlength
     
   })
      }))
   }*/

  /* getBuyerName(){

    let id=this.sellerServ.getSellerId()

    this.loggedToken=id
    const q = collection(this.firestore, 'Orders')
    
    const allOrders = collectionData(q) as Observable<Orders[]>
    
   return  allOrders.subscribe(e=>e.map((e)=>{
    
      console.log(this.pend)
     e?.Product.map((e)=>{
       
      let stat =e?.Seller_ID

      
     if(stat == this.loggedToken){
      
     // this.buyer=buyer

      
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
  /* getAllOrders(){
    this.id=this.sellerServ.getSellerId().toString()
    console.log(this.id)
   this.loggedToken=this.id
    console.log(this.loggedToken)
    const q = collection(this.firestore, 'Orders')
    
    const allOrders = collectionData(q) as Observable<Orders[]>
 
   return  allOrders.subscribe(e=>e.map((e)=>{
     /**date 
     let date = e.date
     /**name & status 
     let buyer = e.buyer.id
     this.pend = e.status

     e.Product.map(e=>{
       /**quantity 
       let quant = e.Product_Quntity

       let stat =e.Seller_ID
       console.log(stat)
     if(stat = this.loggedToken){
       /**quantity & date 
       this.quantity.next(quant)
       console.log(date)
       this.orderDate.next(date)

       /**status check 
       if(this.pend == true){
         console.log(this.pend, "when true")
         this.delivered.next(1)
         console.log(this.deliver)
       } else if (this.pend==false){
         this.pending.next(0)
         console.log(this.pend, "whenfasle")
         console.log(this.pending)
       }
       /**get buyer name 
       let final =  this.db.collection<ISeller>('users')
     .doc(`${buyer}`).get().subscribe((res)=>{
       var res2 = res.data();
      this.buyer = res2?.FirstName
        this.orderBuyer.next(this.buyer)

       
       return final
     })

      let prodIds = e.Product_Id.id
 
      this.db.collection<IProduct>('Products').doc(`${prodIds}`).get().subscribe(
        (d)=>{let d2 = d.data(); this.price.next(d2.Price*quant)
           this.prodName.next(d2.Name)
           this.prodNameAr.next(d2.NameAr)
       }
      )
     }
   })
      }))*/
      getAllOrders(){
     this.id=this.sellerServ.getSellerId()
     console.log(this.id)
    this.loggedToken=this.id
     console.log(this.loggedToken)
     const q = collection(this.firestore, 'Orders')
     
     const allOrders = collectionData(q) as Observable<Orders[]>
  
    return  allOrders.subscribe(e=>e.map((e)=>{
      /**date */
      let date = e.date
      /**name & status */
      let buyer = e.buyer.id
      

      e.Product.map(e=>{
        /**quantity */
        let quant = e.Product_Quntity
        let pend = e.deliveredstatus
        let stat =e.Seller_ID
        
      if( this.loggedToken==stat ){
        /**quantity & date */
        this.quantity=quant
        console.log(date)
        this.orderDate=date
        console.log(buyer)
       /* *status check 
        if(this.pend == true){
          console.log(this.pend, "when true")
          this.delivered=true
          console.log(this.deliver)
        } else if (this.pend==false){
          this.pending=false
          console.log(this.pend, "whenfasle")
          console.log(this.pending)
        }*/
        /**get buyer name */
          this.db.collection<ISeller>('users')
      .doc(`${buyer}`).get().subscribe((res)=>{
        var res2 = res.data();
       this.buyer = res2.firstname
         let name =this.buyer
        console.log(this.orderBuyer)
       
       // return final
      
        console.log(pend)
        //this.pending.next(this.pend)
       let prodIds = e.Product_Id.id
   
        this.pending = pend
      
      console.log(this.pending)
       this.db.collection<IProduct>('Products').doc(`${prodIds}`).get().subscribe(
         (d)=>{let d2 = d.data(); this.price=d2.Price*quant
            this.prodName=d2.Name
            this.prodNameAr=d2.NameAr
            console.log(this.pend)
        
            let data: OrderData = {
              date: date,
              quantity: quant,
               prodName:this.prodName,
                prodNameAr: this.prodNameAr,
                 buyer: name,
                  total:this.price,
                   deliveredstatus: pend }
            this.ordersdata.next(data)
          })
         })  
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