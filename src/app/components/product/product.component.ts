import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../Service/product.service';
import {IProduct} from './../../ViewModel/product';
import { Observable } from 'rxjs';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
 // Product:Observable<IProduct[]>;
  Products: IProduct[] = [];
  constructor(firestore: Firestore, private prodServ: ProductService) { 
   // this.Product=prodServ.getAllproduct();
  } 

  ngOnInit(): void {
    this.prodServ.getAllproduct().subscribe((res: IProduct[]) => {
      this.Products = res;
    })
    
  }
  // editModal(prod: IProduct) {
  //   const modalRef = this.modal.open(EditBookComponent, {
  //     size: 'lg',
  //     centered: true,
  //     windowClass: 'dark-modal',
  //   });

  //   modalRef.componentInstance.id =prod.id;
  // }

  deleteprod(prod: IProduct) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.prodServ.deleteProd(prod).then(() => 
       console.log('delete successful'));
    }
  }
}
