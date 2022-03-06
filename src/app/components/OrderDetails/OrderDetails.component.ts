import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/Service/orders.service';

@Component({
  selector: 'app-OrderDetails',
  templateUrl: './OrderDetails.component.html',
  styleUrls: ['./OrderDetails.component.scss']
})
export class OrderDetailsComponent implements OnInit {

  constructor(private orderServ: OrdersService) { }

  ngOnInit() {
    console.log(this.orderServ.getAllOrders())

  }

}
