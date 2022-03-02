import { Component, OnInit } from '@angular/core';
import {AuthSellerService} from '../../Service/authSeller.service'
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  public IsUserLog:boolean=false;
  constructor(authSeller:AuthSellerService) { }

  ngOnInit(): void {
   
  }


  logout()
  {
   
  }

}
