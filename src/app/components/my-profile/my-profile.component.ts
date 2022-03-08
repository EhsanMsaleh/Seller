import { ISeller } from 'src/app/ViewModel/user';
import { Component, OnInit } from '@angular/core';
import { AuthSellerService } from 'src/app/Service/authSeller.service';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {
seller:ISeller;
  constructor(private sellerServ:AuthSellerService,private router: Router,
    ) {  }


  ngOnInit(): void {
    
    this.sellerServ.getSellerById().subscribe((e)=>{
      console.log(e)
     this.seller=e
     })
  //   console.log(this.sellerServ.getSellerId())
  //   let id = localStorage.getItem('id');
  //   this.seller=this.sellerServ.getSellerById(id)
  //   //this.sellerServ.getSellerById(id).subscribe((data)=>{this.seller=data})
  // console.log(this.seller)


  }

  

}
