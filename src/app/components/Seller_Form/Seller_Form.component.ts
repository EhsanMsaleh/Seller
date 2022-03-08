import { Location } from '@angular/common';

import { Component, OnInit } from '@angular/core';
import { ISeller } from '../../ViewModel/user'
import {AuthSellerService} from '../../Service/authSeller.service';
import { Router, ActivatedRoute } from '@angular/router';
import {AngularFirestore  } from '@angular/fire/compat/firestore';
import {  NgForm, FormsModule ,FormBuilder, FormControl, FormGroup, Validators , FormArray} from '@angular/forms';
import {
  Firestore, addDoc, collection, collectionData,
  doc, docData, deleteDoc, updateDoc, DocumentReference,where, setDoc
} from '@angular/fire/firestore';
@Component({
  selector: 'app-seller_register',
  templateUrl: './Seller_Form.component.html',
  styleUrls: ['./Seller_Form.component.scss'],

})
export class Seller_FormComponent implements OnInit {
  public seller:any;
  errorMessage:string=''
  public NewSeller: ISeller = {} as ISeller;
  SellerRegisForm! :FormGroup;
  currSell:ISeller;
  constructor(
    private fb:FormBuilder,
    private router: Router,
    private ActivatedRoute: ActivatedRoute,
    private SellerServ: AuthSellerService,
    private db: AngularFirestore,
    private firestore: Firestore,
    private location: Location,
  ) {



  }


  ngOnInit() {


    ///////////////////

    /////////////////////
    this.SellerServ.getSellerById().subscribe((e)=>{
        console.log(e)
        this.currSell=e
       })

  }



 Update(Seller:NgForm) {


    this.SellerServ.updateSeller(this.currSell).then(() => {
        Seller.reset();
        alert("Done")
        this.location.back();
      })
  }
}
  ///////////////////////////////










