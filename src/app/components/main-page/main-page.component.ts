import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/Service/product.service';
import { SellerService } from 'src/app/Service/seller.service';
import { Lang } from 'src/app/ViewModel/lang';
import { IProduct } from 'src/app/ViewModel/product';
import { ISeller } from 'src/app/ViewModel/user';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
Product: IProduct[]=[]
prods: IProduct
productsAmount:number = 0
outOfStockAmount:number = 0
rejectAmount:number = 0
sellerName:string=''
outOfStock:IProduct[]=[] 
rejected:IProduct[]=[] 
lang:Lang[]
langTry:{};
think:string='';
  constructor( private prodServ: ProductService, private sellerServ: SellerService) { 
    this.lang=[{
        waitingEn:"waiting shipment",
        waitingAr:"ينتظر الشحن",
        shippedEn:"Orders Shipped",
        shippedAr:"الطلبات المشحونة",
        historyEn:"Orders History",
        historyAr:"تاريخ الطلبات",
        salesDEn:"Total Sales",
         salesDAr:"إجمالى المبيعات",
        revEn:"Total Revenue",
         revAr:"إجمالى الأرباح",
        saleHistEn:"Sales History",
         salesHistAr:"تاريخ المبيعات",
        activeEn:"Active Products",
         activeAr:"المنتجات المفعلة",
        outEn:"Out of Stock",
         outAr:"نفذت كميتها",
        cancelEn:"Cancelled Products",
         cancelAr:"المنتجات الملغية",

          salesEn:"My Sales",
           salesAr:"المبيعات",
          productsEn:"Products",
           productsAr:"المنتجات"
      
      
      }]
      this.langTry={
        box1:{arabic: 'try', eng:'catch'}
      }
  }
  
  ngOnInit(): void {
    /*this.sellerServ.getSellerData().subscribe((r)=>this.sellerName = r)
    console.log(this.sellerName)*/
    this.prodServ.getAllproduct()
    this.prodServ.prod.subscribe((e)=>{
      this.prods=e
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
    })
    


    
    this.sellerServ.getSellerData().subscribe(prd =>this.sellerName = prd)
    this.think = this.lang[0].salesAr
  }
 
}
