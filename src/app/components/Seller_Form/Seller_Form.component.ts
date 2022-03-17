import { Location } from '@angular/common';
import {Sellerformlang} from './sellerformlang'
import { Component, OnInit } from '@angular/core';
import { Seller } from '../../ViewModel/seller'
import {AuthSellerService} from '../../Service/authSeller.service';
import { Router, ActivatedRoute } from '@angular/router';
import {AngularFirestore  } from '@angular/fire/compat/firestore';
import {  NgForm, FormsModule ,FormBuilder, FormControl, FormGroup, Validators , FormArray} from '@angular/forms';
import {
  Firestore, addDoc, collection, collectionData,
  doc, docData, deleteDoc, updateDoc, DocumentReference,where, setDoc
} from '@angular/fire/firestore';
import Swal from 'sweetalert2/src/sweetalert2.js'

@Component({
  selector: 'app-seller_register',
  templateUrl: './Seller_Form.component.html',
  styleUrls: ['./Seller_Form.component.scss'],

})
export class Seller_FormComponent implements OnInit {
  public seller:any;
  errorMessage:string=''
  public NewSeller: Seller = {} as Seller;
  SellerRegisForm! :FormGroup;
  currSell:Seller;
  decide:string=''
  lang: Sellerformlang;
  header:string;
  buttonlang:string;
  langDet:boolean=false 
  enterfn:string
  enterln:string

  entercn:string

  enterph:string
  constructor(
    private fb:FormBuilder,
    private router: Router,
    private ActivatedRoute: ActivatedRoute,
    private SellerServ: AuthSellerService,
    private db: AngularFirestore,
    private firestore: Firestore,
    private location: Location,
  ) {
this.lang={
  headerEN:"Edit Seller Account",
  headerAR:"تعديل حساب البائع",
  buttonEN:"Update Account",
  buttonAR:"تعديل الحساب",
  enterfnEN:'Enter Your FirstName',
  enterfnAR:'ادخل الاسم الاول',
  enterlnEN:'Enter Your LastName',
  enterlnAR:'ادخل اسم العائلة',

  entercnEN:'Enter Company Name',
  entercnAR:'ادخل اسم الشركة',

  enterphEN:'Enter Your Phone Number',
  enterphAR:'ادخل رقم الهاتف',
}


  }


  ngOnInit() {
    this.SellerServ.getSellerById().subscribe((e)=>{
      console.log(e)
      this.currSell=e
     })
    this.decide = localStorage.getItem('lang')
    
    console.log(this.decide)
    if (this.decide == null) {
      this.header=this.lang.headerEN
      this.buttonlang=this.lang.buttonEN
      this.enterfn=this.lang.enterfnEN
      this.enterln=this.lang.enterlnEN
      this.entercn=this.lang.entercnEN
      this.enterph=this.lang.enterphEN
    }
    this.switchHandle()

    ///////////////////

    /////////////////////
   

  }



 Update(Seller:NgForm) {


    this.SellerServ.updateSeller(this.currSell).then(() => {
        Seller.reset();
        Swal.fire({
          icon: 'success',
          title: 'Done',
        
        })
       // alert("Done")
        this.location.back();
      })
  }

  switchHandle() {
    if (this.decide == 'EN') {
      this.langDet = !this.langDet
      let styled = document.getElementsByTagName('div')
      this.header=this.lang.headerEN
      this.buttonlang=this.lang.buttonEN
      this.enterfn=this.lang.enterfnEN
      this.enterln=this.lang.enterlnEN
      this.entercn=this.lang.entercnEN
      this.enterph=this.lang.enterphEN
      if (styled.length != 0) {
        for (let i = 0; i <= styled.length; i++) {
          styled[i].style.direction = 'ltr'
        }
      }
    } else if (this.decide == 'AR') {
      let styled = document.getElementsByTagName('div')
      this.header=this.lang.headerAR
      this.buttonlang=this.lang.buttonAR
      this.enterfn=this.lang.enterfnAR
      this.enterln=this.lang.enterlnAR
      this.entercn=this.lang.entercnAR
      this.enterph=this.lang.enterphAR
      if (styled.length != 0) {
        for (let i = 0; i <= styled.length; i++) {
          styled[i].style.direction = 'rtl'
        }
      }
    }
  }

}
  ///////////////////////////////










