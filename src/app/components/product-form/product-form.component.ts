import { Component, OnInit } from '@angular/core';

import { IProduct } from '../../ViewModel/product';
import { ProductService } from '../../Service/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { format } from 'path';
@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  public prod:any;
  public NewProd: IProduct = {} as IProduct;
  public InputCat: string = '';
  public InputNameProd: string = '';
  //  public IdProd:number=0;
  public InputQuantityProd: number = 0;
  public InputPriceProd: number = 0;
  public InputImgProd: string = '';
  public InputDescription: string = '';
  public InputSize: string = '';
  public InputDiem: string = '';
 public searchKey!:string[];
   constructor(
    private router: Router,
    private ActivatedRoute: ActivatedRoute,
    private prodServ: ProductService
  ) {

      
   
    this.NewProd = {
      Name: this.InputNameProd,
      Description: this.InputDescription,
      Image: this.InputImgProd,
      Size: this.InputSize,
      Diemention: this.InputDiem,
      Category: this.InputCat,
      Price: this.InputPriceProd,
      Rank: 0,
      Quantity: this.InputQuantityProd,
     // SellerID: 'users/ SZREo5iMzjFm2lC35dz3',
      
    };
    
  }

  ngOnInit() {
   
    this.sea("jjjjgtfhgf")

    if(this.ActivatedRoute.snapshot.params['pid'])
    {  
      this.prodServ.getProdByID(this.ActivatedRoute.snapshot.params['pid']).subscribe(res => {
       this.NewProd=res
      console.log(this.NewProd)
      
    });
   
      console.log(this.InputQuantityProd);
    }
   

  }

sea(name:string){
  var name = name.toLowerCase();
  var keyWords:string[]=[];
  var words = name.split(' ');
  words.forEach((word)=>{
    var appendstring='';
    var sp=word.split('');
    sp.forEach((ch)=>{
     appendstring +=ch;
     keyWords.push(appendstring);
    })
  })
  console.log(keyWords)
  return keyWords
}

  onSubmit(form: NgForm) {

    
    if(this.ActivatedRoute.snapshot.params['pid'])
    { 
      this.NewProd={...this.NewProd,searchKey:this.sea(this.NewProd.Name!)}

      this.prodServ.updateProd(this.NewProd).then(() => {
        form.reset();
        alert("Done")
        this.router.navigate(['/Products']);
      })
    }
    else{
    
     
    this.NewProd={...this.NewProd,searchKey:this.sea(this.NewProd.Name!)}
      console.log(this.NewProd.searchKey);
      this.prodServ.addNewprod(this.NewProd).then(()=>form.reset())
    }
    

    
  }
}

