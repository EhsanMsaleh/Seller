import { ICategory } from './../../ViewModel/category';
import { Component, OnInit } from '@angular/core';
import {AngularFirestore ,  } from '@angular/fire/compat/firestore';
import {
  Firestore, addDoc, collection, collectionData,
  doc, docData, deleteDoc, updateDoc, DocumentReference,where, setDoc
} from '@angular/fire/firestore';
import { IProduct } from '../../ViewModel/product';
import { ProductService } from '../../Service/product.service';
import {CategoryService} from '../../Service/category.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { format } from 'path';
import * as firebase from 'firebase/compat';
import { Location } from '@angular/common';
@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  Category: ICategory[]=[]
  public prod:any;
  public NewProd: IProduct = {} as IProduct;
  public InputCat: string = '';
  public InputNameProd: string = '';
  //  public IdProd:number=0;
  public InputQuantityProd: number = 0;
  public InputPriceProd: number = 0;
  public InputImgProd: string = '';
  public InputDescription: string = '';
  public InputSize: string = '';
  public InputDiem: string = '';
 public searchKey!:string[];
   constructor(
    private router: Router,
    private ActivatedRoute: ActivatedRoute,
    private prodServ: ProductService,
    private db: AngularFirestore,
    private firestore: Firestore,
    private catServ:CategoryService,
    private location: Location
  ) {

      
   

    // this.NewProd = {
    //   Name: this.InputNameProd,
    //   Description: this.InputDescription,
    //   Image: this.InputImgProd,
    //   Size: this.InputSize,
    //   Diemention: this.InputDiem,
    //   Category: this.InputCat,
    //   Price: this.InputPriceProd,
    //   Rank: 0,
    //   Quantity: this.InputQuantityProd,
    // //  SellerID: db.doc('users/' + firebase.auth().currentUser.uid)
    //  // SellerID: 'users/GJdYZoixIgn7krJLNZWV',

    // };
    
  }

  ngOnInit() {
    this.catServ.getAllCategory()
    this.catServ.Category.subscribe((e) => {

      this.Category = e

    
      console.log(this.Category)
    })
    

    if(this.ActivatedRoute.snapshot.params['pid'])
    {  
      this.prodServ.getProdByID(this.ActivatedRoute.snapshot.params['pid']).subscribe(res => {
       this.NewProd=res
      console.log(this.NewProd)
      
    });
   
      console.log(this.InputQuantityProd);
    }
   

  }

sea(name:string){
  var name = name.toLowerCase();
  var keyWords:string[]=[];
  var words = name.split(' ');
  words.forEach((word)=>{
    var appendstring='';
    var sp=word.split('');
    sp.forEach((ch)=>{
     appendstring +=ch;
     keyWords.push(appendstring);
    })
  })
  console.log(keyWords)
  return keyWords
}

  onSubmit(form: NgForm) {

    
    if(this.ActivatedRoute.snapshot.params['pid'])
    { 
      this.NewProd={...this.NewProd,searchKey:this.sea(this.NewProd.Name!)}

      this.prodServ.updateProd(this.NewProd).then(() => {
        form.reset();
        alert("Done")
        this.location.back();
      })
    }
    else{
    
    // currentUser.uid=id
   let currentUser="GJdYZoixIgn7krJLNZWV"
   console.log(this.NewProd);
   console.log("---------------");
  // this.NewProd={...this.NewProd,searchKey:{...this.sea(this.NewProd.Name!),...this.sea(this.NewProd.NameAr!)},Rank:0}
/*  this.NewProd={...this.NewProd,searchKey:{...this.sea(this.NewProd.Name!),...this.sea(this.NewProd.NameAr!)},Rank:0,
    SellerID:doc(this.firestore,'users','GJdYZoixIgn7krJLNZWV') }

    console.log(this.NewProd);
    // this.prodServ.addNewprod(this.NewProd).then(()=>form.reset())*/

    }
    

    
  }
}

