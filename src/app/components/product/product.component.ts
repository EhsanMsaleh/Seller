import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../Service/product.service';
import { IProduct } from './../../ViewModel/product';

import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';

import { Firestore, collectionData, collection } from '@angular/fire/firestore';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  Product:Subscription;
  //Product:Observable<IProduct[]>;
  Products: IProduct[] = [];
  prods: IProduct;
  ProductsMo: IProduct[] = [];
searchProducts:IProduct[]=[]

  word = new Subject<string>()
  wordStr = this.word.asObservable()
  public InputSearch: string = "";

  constructor(firestore: Firestore, private prodServ: ProductService) {
    // this.Product=prodServ.getAllproduct();
  }

  ngOnInit(): void {

    /* this.prodServ.getAllproduct().subscribe((res: IProduct[]) => {

       this.Products = res;
     })*/
    /*this.prodServ.getAllproduct().subscribe((e)=>{
      e.map((prd)=>{
        //this.Products= prd.payload.doc.data()
        console.log(prd.payload.doc.data())
      })*/

this.Product=this.prodServ.getAllproduct()
.subscribe(
// data=>{this.result=data}
//this.prod.next(e); this.result=e; this.resarr.push(this.result);
  data =>{   this.ProductsMo=data.map((el)=>{

    return{
      id:el.payload.doc.id,
      ...(el.payload.doc.data() as IProduct)

    }
   
  }); console.log(this.ProductsMo)
    }
    
    )

    this.prodServ.getAllproduct()

    this.prodServ.prod.subscribe((e) => {

      this.prods = e
console.log( this.prods)
      this.Products.push(this.prods)
      this.Products = this.searchProducts
      console.log(this.Products)
    })

    this.searchProducts.pop()
    this.Products.pop()
    /*  console.log(this.prodServ.getAllproduct().subscribe((res)=>{var res2 = res.data();
        console.log(res2)
        res2?.Product?.map(
          ((el)=>{el.Product_Id.get().then(
            (prd)=>{this.Products = prd.data()
            })
          })
          )
      })*/


  // editModal(prod: IProduct) {
  //   const modalRef = this.modal.open(EditBookComponent, {
  //     size: 'lg',
  //     centered: true,
  //     windowClass: 'dark-modal',
  //   });

    this.wordStr.subscribe((res) => {
    this.prodServ.searchByName(res).subscribe((res) => {
      this.Products = res;
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
