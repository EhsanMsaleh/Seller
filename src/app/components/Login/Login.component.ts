import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  FormArray,
} from '@angular/forms';
import { ISeller } from '../../ViewModel/user';
import { LoginService } from '../../Service/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthSellerService } from '../../Service/authSeller.service';

@Component({
  selector: 'app-Login',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.scss'],
})
export class LoginComponent implements OnInit {
  public UserName:string="";
  public PassUser:string="";
  public ISuserlog:boolean=false;
  constructor(
    private authseller: AuthSellerService,
    private fb: FormBuilder,
    private SellerService: LoginService ,
    private router: Router
  ) {}

  ngOnInit() {
    this.ISuserlog = this.authseller.IsUserLogged;
  }

 
}
