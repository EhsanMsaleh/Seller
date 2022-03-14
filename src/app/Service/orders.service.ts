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
  salesData:Sales[] =[] 
  salesDataArr = new BehaviorSubject<Sales[]>([{}])
  ordersdata  = new BehaviorSubject<OrderData>({})
  constructor(private firestore: Firestore, private db: AngularFirestore, private sellerServ: AuthSellerService) {
    const collectionseller:any = collection(firestore, 'Orders');
    this.Order = collectionData(collectionseller);
   }

   
      getAllOrders(){
     this.id=this.sellerServ.getSellerId()
   
    this.loggedToken=this.id
    
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
   
        this.orderDate=date
        
      
        /**get buyer name */
          this.db.collection<ISeller>('users')
      .doc(`${buyer}`).get().subscribe((res)=>{
        var res2 = res.data();
       this.buyer = res2.firstname
         let name =this.buyer
   
       
       // return final

        //this.pending.next(this.pend)
       let prodIds = e.Product_Id.id
   
        this.pending = pend
      
      console.log(this.pending)
       this.db.collection<IProduct>('Products').doc(`${prodIds}`).get().subscribe(
         (d)=>{let d2 = d.data(); this.price=d2.Price*quant
            this.prodName=d2.Name
            this.prodNameAr=d2.NameAr
       
          
            
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
                  //console.log(this.ordersdata)
                })  
         
                
        }
      })
    }))
       
    
  }

}