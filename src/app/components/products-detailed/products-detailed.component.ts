import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../Service/product.service';
import { IProduct } from './../../ViewModel/product';

import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';

import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Lang } from 'src/app/ViewModel/lang';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-products-detailed',
  templateUrl: './products-detailed.component.html',
  styleUrls: ['./products-detailed.component.scss']
})
export class ProductsDetailedComponent implements OnInit {

  Product:Subscription;

  //Product:Observable<IProduct[]>;
  outOfStock:IProduct[]=[] 
activeProd:IProduct[]=[]

  Products: Subscription
  prods: IProduct
  ProductsMo: IProduct[] = [];
  searchProducts:IProduct[]=[]
  type= new BehaviorSubject<string>('')
  word = new Subject<string>()
  wordStr = this.word.asObservable()
  public InputSearch: string = "";
startState:boolean=true;
  constructor(firestore: Firestore, private prodServ: ProductService, private ActivatedRouteServ:ActivatedRoute, private router:Router) {
    // this.Product=prodServ.getAllproduct();
  
  }

  ngOnInit(): void {
    console.log(this.ActivatedRouteServ.queryParams['_value'].type);
   /* this.type = this.ActivatedRouteServ.queryParams
     this.prodServ.getAllproduct().subscribe((res: IProduct[]) => {
.snapshot.params['pid']
       this.Products = res;
     })*/
    /*this.prodServ.getAllproduct().subscribe((e)=>{
      e.map((prd)=>{
        //this.Products= prd.payload.doc.data()
        console.log(prd.payload.doc.data())
      })*/

      this.prodServ.getAllproduct()
      /*this.prodServ.prod.subscribe((e)=>{
        this.prods=e
        console.log(this.prods)
       if(this.prods.Quantity!=0 && this.prods.Accepted == true){
          this.Product.push(this.prods)
        } else if(this.prods.Quantity==0 && this.prods.Accepted == true){
          this.outOfStock.push(this.prods)
        } else if(this.prods.Accepted == false){
          this.rejected.push(this.prods);
        }
        
        console.log(this.outOfStock)
        console.log(this.Product)
        this.productsAmount = this.Product.length
       // var out:any = this.Product.filter(e=>e.Quantity==0)
        
        this.outOfStockAmount = this.outOfStock.length
        this.rejectAmount = this.rejected.length
      })*/
      console.log(this.prodServ.mainPageData().subscribe(data =>{console.log(data)
      
        }))
      this.Products=this.prodServ.getAllproduct()
      .subscribe(
      // data=>{this.result=data}
      //this.prod.next(e); this.result=e; this.resarr.push(this.result);
        data =>{this.ProductsMo=data.map((el)=>{
          
          return{
            id:el.payload.doc.id,
            ...(el.payload.doc.data() as IProduct)
          
       
          
          }
        
        });
      
        console.log(this.ProductsMo)
  
    /*          this.prodServ.getAllproduct()
      
          this.prodServ.prod.subscribe((e) => {
      
            this.prods = e
      */
      
  
      this.ProductsMo.map((e)=>{
        this.prods = e
        if(this.ActivatedRouteServ.queryParams['_value'].type == "available"){
           if(this.prods.Quantity!=0){
         this.activeProd.push(this.prods)
        console.log(this.prods)
          }  
      } else if(this.ActivatedRouteServ.queryParams['_value'].type == "outOfStock"){
        if(this.prods.Quantity==0){
         this.activeProd.push(this.prods)
        }
      }
      console.log(this.activeProd)
      
    })
    
    
   
      console.log(this.prods)

      // var out:any = this.Product.filter(e=>e.Quantity==0)
      
      console.log(this.outOfStock)
  
 
      
          
  })

    this.wordStr.subscribe((res) => {
    this.prodServ.searchByName(res).subscribe((res) => {
      this.ProductsMo = res;
      console.log(res)
    })

  })

  }


deleteprod(prod: IProduct) {
  if (confirm('Are you sure to delete this record ?') == true) {
    this.prodServ.deleteProd(prod).then(() =>
      console.log('delete successful'));
  }
}
//في حاجه غلط في السيررررررررررش
search(){
  if (this.InputSearch === "") {
    this.prodServ.getAllproduct()
    this.prodServ.prod.subscribe((res) => {
   //3yzen n3ml if condition tw2f al push fil array lw fih nfs 3dd alproducts
   this.ProductsMo=[];

     this.prods = res
     console.log(res)
   //  if(this.Products.length != this.searchProducts.length){
      //مع كل تغييره هنجيب ال all , نشوف لو مش موجود ال input نجيبه تاني products

       this.ProductsMo.push(this.prods);
    // }

    })


  }
  if (this.InputSearch != "") {
    //if(this.Products.length != this.searchProducts.length){
   //   this.Products=[]
    this.word.next(this.InputSearch)
    console.log(this.InputSearch)
  //  }
  }

}
}

