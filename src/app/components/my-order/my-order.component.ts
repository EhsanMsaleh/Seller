import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {Orders} from '../../ViewModel/orders'
import {OrdersService} from '../../Service/orders.service';
import { ISeller } from 'src/app/ViewModel/user';
@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.scss']
})
export class MyOrderComponent implements OnInit {
  Orders:Observable<Orders[]>;
  constructor(private orderServ:OrdersService) {
    //this.Orders=orderServ.getAllOrders();
    
  
  }

  ngOnInit(): void {
    
//this.orderServ.getAllOrders()
//this.orderServ.orderSeller.subscribe(e=>{let asData = e.SellerID.id;
 // console.log(asData)
//})
  }

}
