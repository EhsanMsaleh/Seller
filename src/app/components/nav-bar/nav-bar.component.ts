import { Component, OnInit } from '@angular/core';
import {AuthSellerService} from '../../Service/authSeller.service'
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  public IsUserLog:boolean=false;
  token:string='';
shownlang:boolean=false;
  constructor(authSeller:AuthSellerService) { }

  ngOnInit(): void {
   
  }


  logout()
  {
   
  }
  switch(){

    let decide= localStorage.getItem('lang')
    console.log(decide)
    
    /* switch(decide){
      case "'EN'": this.token = "AR"
      localStorage.setItem('lang', this.token)
      
      break;
      case "'AR'":    this.token = "EN"
      localStorage.setItem('lang', this.token)
      break;
    
    }*/

   if(decide == 'EN'){
      this.token = "AR"
      localStorage.setItem('lang', this.token)
    } else if( decide == 'AR'){
      this.token = "EN"
      localStorage.setItem('lang', this.token)
    }
   
      
      window.location.reload()
  }
}
