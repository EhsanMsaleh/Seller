import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {Orders} from '../../ViewModel/orders'
import {OrdersService} from '../../Service/orders.service';
@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.scss']
})
export class MyOrderComponent implements OnInit {
  Orders:Observable<Orders[]>;
  constructor(orderServ:OrdersService) {
    this.Orders=orderServ.getAllOrders();
   }

  ngOnInit(): void {
  }

}
