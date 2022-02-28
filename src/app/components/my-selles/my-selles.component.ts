import { Component, OnInit } from '@angular/core';
import{SalesService}from '../../Service/sales.service';
import {Sales} from './../../ViewModel/sales';
import { Observable } from 'rxjs';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
@Component({
  selector: 'app-my-selles',
  templateUrl: './my-selles.component.html',
  styleUrls: ['./my-selles.component.scss']
})
export class MySellesComponent implements OnInit {
  Sales:Observable<Sales[]>;
  constructor(salesServ:SalesService) {
    this.Sales=salesServ.getAllSales()
   }

  ngOnInit(): void {
  }

}
