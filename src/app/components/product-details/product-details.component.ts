import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import {ProductService} from '../../Service/product.service';
import {IProduct} from './../../ViewModel/product';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductFormComponent } from '../product-form/product-form.component';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
prodId:any;
product:any;


  constructor( private modal: NgbModal,private prodServ:ProductService, private ActivatedRouteServ:ActivatedRoute, private router:Router) { }

  ngOnInit() {
    console.log(this.ActivatedRouteServ.snapshot.params['pid']);

    this.ActivatedRouteServ.paramMap.subscribe((paramMap)=>{
      this.prodId=this.ActivatedRouteServ.snapshot.params['pid']
      console.log(this.prodId)
      this.prodServ.getProdByID(this.prodId).subscribe((prod)=>{
        this.product=prod;

      })
    })  
  } 
  // editModal(prod:IProduct) {
  //   const modalRef = this.modal.open(ProductFormComponent, {
  //     size: 'lg',
  //     centered: true,
  //     windowClass: 'dark-modal',
  //   });

  //   modalRef.componentInstance.id = prod.id;
  // }
 
}
