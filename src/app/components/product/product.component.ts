import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../Service/product.service';
import {IProduct} from './../../ViewModel/product';
import { Observable, Subject } from 'rxjs';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
 // Product:Observable<IProduct[]>;
  Products: IProduct[] = [];
  word= new Subject<string>()
  wordStr=this.word.asObservable()
  public InputSearch:string="";
  constructor(firestore: Firestore, private prodServ: ProductService) { 
   // this.Product=prodServ.getAllproduct();
  } 

  ngOnInit(): void {

    this.prodServ.getAllproduct().subscribe((res: IProduct[]) => {
      this.Products = res;
    })
    this.wordStr.subscribe((res)=>{
      this.prodServ.searchByName(res).subscribe((res)=>{this.Products=res; 
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

  search(){
    if(this.InputSearch==="")
    {
      this.prodServ.getAllproduct().subscribe((res: IProduct[]) => {
        this.Products = res;
      })
    }
     if(this.InputSearch!=""){
      this.word.next(this.InputSearch)
      console.log(this.InputSearch)
    }
   
  }
}
