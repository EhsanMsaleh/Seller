import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../Service/product.service';
import { IProduct } from './../../ViewModel/product';

import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';

import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Lang } from 'src/app/ViewModel/lang';
import { ProdLang } from './prod-lang';

@Component({ 
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  lang:ProdLang
  langDet:boolean=false
  decide:string=''
  searche:string=""
    name:string=""
    quant:string=""
    price:string=""
    img:string=""
    dets:string=""
    edit:string=""
    delete:String=""



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
    this.lang={
      searchEn:"search by Product Name",
      nameEn:"Name",
      quantEn:"Quantity",
      priceEn:"Price",
      imgEn:"Image",
      detsEn:"Details",
      editEn:"Edit",
      deleteEn:"delete",
      searchAr:"بحث بأسم المنتج",
      nameAr:"الأسم",
      quantAr:"الكمية",
      priceAr:"السعر",
      imgAr:"الصورة",
      detsAr:"تفاصيل",
      editAr:"تعديل",
      deleteAr:"حذف",
    }
  }

  ngOnInit(): void {


    this.decide = localStorage.getItem('lang')
    console.log(this.decide)
    if (this.decide == null) {
      this.searche=this.lang.searchEn
    this.name=this.lang.nameEn
    this.quant=this.lang.quantEn
    this.price=this.lang.priceEn
    this.img=this.lang.imgEn
    this.dets=this.lang.detsEn
    this.edit=this.lang.editEn
    this.delete=this.lang.deleteEn

    }

    
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
   
  }); //console.log(this.ProductsMo)
    }
    
    )

    this.prodServ.getAllproduct()

    this.prodServ.prod.subscribe((e) => {

      this.prods = e


//console.log( this.prods)


      this.ProductsMo.push(this.prods)
      this.ProductsMo= this.searchProducts
    //  console.log(this.ProductsMo)
    })


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
      this.ProductsMo = res;
      console.log(this.ProductsMo)
    })

  })
    this.switchHandle()
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



switchHandle() {
  if (this.decide == 'EN') {
    this.langDet = !this.langDet
    let styled = document.getElementsByTagName('div')
    this.searche=this.lang.searchEn
    this.name=this.lang.nameEn
    this.quant=this.lang.quantEn
    this.price=this.lang.priceEn
    this.img=this.lang.imgEn
    this.dets=this.lang.detsEn
    this.edit=this.lang.editEn
    this.delete=this.lang.deleteEn
    if (styled.length != 0) {
      for (let i = 0; i <= styled.length; i++) {
        styled[i].style.direction = 'ltr'
      }
    }
  } else if (this.decide == 'AR') {
    let styled = document.getElementsByTagName('div')
    this.searche=this.lang.searchAr
    this.name=this.lang.nameAr
    this.quant=this.lang.quantAr
    this.price=this.lang.priceAr
    this.img=this.lang.imgAr
    this.dets=this.lang.detsAr
    this.edit=this.lang.editAr
    this.delete=this.lang.deleteAr
    if (styled.length != 0) {
      for (let i = 0; i <= styled.length; i++) {
        styled[i].style.direction = 'rtl'
      }
    }
  }
}


}
