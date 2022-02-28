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
      SellerID: 'users/ SZREo5iMzjFm2lC35dz3',
    };
  }

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    console.log(form.value);
    this.prodServ.addNewprod(form.value).then(()=>form.reset())
  }
}

