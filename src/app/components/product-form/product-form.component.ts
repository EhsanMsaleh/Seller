import { ICategory } from './../../ViewModel/category';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getStorage, ref } from "firebase/storage";
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  doc,
  docData,
  deleteDoc,
  updateDoc,
  DocumentReference,
  where,
  setDoc,
} from '@angular/fire/firestore';
import Swal from 'sweetalert2/src/sweetalert2.js'

import { IProduct } from '../../ViewModel/product';
import { AuthSellerService } from 'src/app/Service/authSeller.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ProductService } from '../../Service/product.service';
import { CategoryService } from '../../Service/category.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { format } from 'path';
import * as firebase from 'firebase/compat';
import { Location } from '@angular/common';
import { ProdFormLang } from './prod-form-lang';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  downloadURL:Observable<any>
  fb:string;
  Category: ICategory[] = [];
  lang: ProdFormLang;
  public prod: any;
  public NewProd: IProduct = {} as IProduct;
  public InputCat: string = '';
  public InputNameProd: string = '';
  //  public IdProd:number=0;
  public InputQuantityProd: number = 0;
  public InputPriceProd: number = 0;
  public InputImgProd: null;
  public InputDescription: string = '';
  public InputSize: string = '';
  public InputDiem: string = '';
  public searchKey!: string[];
  seller: any;
  /**for products */
  addProd: string = '';
  prodName: string = '';
  enterProdName: string = '';
  prodQuant: string = '';
  prodArName: string = '';
  enterArProdName: string = '';
  enterQuant: string = '';
  prodPrice: string = '';
  enterPrice: string = '';
  prodLink: string = '';
  enterLink: string = '';
  availSize: string = '';
  dimensions: string = '';
  Endescription: string = '';
  enterEnDesc: string = '';
  Ardescription: string = '';
  enterArDesc: string = '';
  EnprodCat: string = '';
  ArProdCat: string = '';
  decide: string = '';
  addEdit: string = '';
  langDet: boolean = false;
  prodID:string =""
  prodwid:IProduct
  
  constructor(
    private router: Router,
    private ActivatedRoute: ActivatedRoute,
    private prodServ: ProductService,
    private db: AngularFirestore,
    private firestore: Firestore,
    private catServ: CategoryService,
    private location: Location,
    private sellerServ: AuthSellerService,
    private storage: AngularFireStorage
  ) {
    this.lang = {
      addProdEn: 'Add\Edit Product',
      prodNameEn: 'Product Name in English ',
      enterProdNameEn: 'Enter Product Name In English ',
      prodQuantEn: 'Product Quantity',
      prodArNameEn: 'Product Name in Arabic',
      enterArProdNameEn: 'Enter Product Name In Arabic',
      enterQuantEn: 'Enter Quantity',
      prodPriceEn: 'Product Price',
      enterPriceEn: 'Enter Price',
      prodLinkEn: 'Product Image',
      enterLinkEn: 'Enter Product Image',
      availSizeEn: 'Avalible Sizes',
      dimensionsEn: 'Enter Avalible dimensions',
      EndescriptionEn: 'English Description',
      enterEnDescEn: 'Enter English Description',
      ArdescriptionEn: 'Arabic Description',
      enterArDescEn: 'Enter Arabic Description',
      EnprodCatEn: 'Product Category in English',
      ArProdCatEn: 'Product Category in Arabic',
      addEditEn: 'Add/Edit',
      addProdAr: 'إضافة/تعديل منتج',
      prodNameAr: ' أسم المنتج بالأنجليزية',
      enterProdNameAr: 'ادخل أسم المنتج بالأنجليزية',
      prodQuantAr: 'كمية المنتج',
      prodArNameAr: 'اسم المنتج بالعربية',
      enterArProdNameAr: 'ادخل أسم المنتج بالعربية',
      enterQuantAr: 'أدخل كمية المنتج',
      prodPriceAr: 'سعر المنتج',
      enterPriceAr: 'أدخل سعر المنتج',
      prodLinkAr: ' صورة المنتج',
      enterLinkAr: 'أدخل رابط صورة المنتج',
      availSizeAr: 'المقاسات المتاحة',
      dimensionsAr: 'أبعاد المنتج',
      EndescriptionAr: 'وصف المنتج بالأنجليزية',
      enterEnDescAr: 'أدخل وصف المنتج بالأنجليزية',
      ArdescriptionAr: 'وصف المنتج بالعربية',
      enterArDescAr: 'أدخل وصف المنتج بالعربية',
      EnprodCatAr: 'أسم الفئة بالأنجليزية',
      ArProdCatAr: 'أسم الفئة بالعربية',
      addEditAr: 'إضافة/تعديل',
    };

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
    /**language */
    
    this.decide = localStorage.getItem('lang');
    console.log(this.decide);
    if (this.decide == null) {
      this.addProd = this.lang.addProdEn;
      this.prodName = this.lang.prodNameEn;
      this.enterProdName = this.lang.enterProdNameEn;
      this.prodQuant = this.lang.prodQuantEn;
      this.prodArName = this.lang.prodArNameEn;
      this.enterArProdName = this.lang.enterArProdNameEn;
      this.enterQuant = this.lang.enterQuantEn;
      this.prodPrice = this.lang.prodPriceEn;
      this.enterPrice = this.lang.enterPriceEn;
      this.prodLink = this.lang.prodLinkEn;
      this.enterLink = this.lang.enterLinkEn;
      this.availSize = this.lang.availSizeEn;
      this.dimensions = this.lang.dimensionsEn;
      this.Endescription = this.lang.EndescriptionEn;
      this.enterEnDesc = this.lang.enterEnDescEn;
      this.Ardescription = this.lang.ArdescriptionEn;
      this.enterArDesc = this.lang.enterArDescEn;
      this.EnprodCat = this.lang.EnprodCatEn;
      this.ArProdCat = this.lang.ArProdCatEn;
      this.addEdit = this.lang.addEditEn;
    }

    /*rest*/
    this.catServ.getAllCategory();
    this.catServ.Category.subscribe((e) => {
      this.Category = e;

      console.log(this.Category);
    });

    if (this.ActivatedRoute.snapshot.params['pid']) {
      this.prodServ
        .getProdByID(this.ActivatedRoute.snapshot.params['pid'])
        .subscribe((res) => {
          this.NewProd = res;
          console.log(this.NewProd);
        });

      console.log(this.InputQuantityProd);
    }

    this.switchHandle();
    this.prodID=this.ActivatedRoute.snapshot.params['pid']
    console.log(this.prodID)
    var el = document.getElementById('img')
    if(!this.prodID){
      el.setAttribute('required', '')
    }
  }

  sea(name: string) {
    var name = name.toLowerCase();
    var keyWords: string[] = [];
    var words = name.split(' ');
    words.forEach((word) => {
      var appendstring = '';
      var sp = word.split('');
      sp.forEach((ch) => {
        appendstring += ch;
        keyWords.push(appendstring);
      });
    });
    console.log(keyWords);
    return keyWords;
  }

  onSubmit(form: NgForm) {
    if (this.ActivatedRoute.snapshot.params['pid']) {
      console.log(this.NewProd.Image)
      this.NewProd = {
        ...this.NewProd,
        searchKey: this.sea(this.NewProd.Name!),
      };
      console.log(this.NewProd.Image)

      this.prodServ.updateProd(this.NewProd).then(() => {
        form.reset();
        Swal.fire({
          icon: 'success',
          title: 'Product Updated Successfully',
          
        })
       // alert('Product Updated Successfully');
        this.location.back();
      });
      console.log(this.NewProd.Image)

    } else {
      this.sellerServ.getSellerById().subscribe((e) => {
        this.seller = e;
      });

      let currentSeller = this.sellerServ.getSellerId();
      let seaarr: string[];
      seaarr = this.sea(this.NewProd.Name!).concat(
        this.sea(this.NewProd.NameAr!)
      );
      //  {...this.sea(this.NewProd.Name!),...this.sea(this.NewProd.NameAr!)}

      seaarr = this.sea(this.NewProd.Name!).concat(
        this.sea(this.NewProd.NameAr!)
      );

   
      this.NewProd = {
        ...this.NewProd,
        searchKey: seaarr,
        Rank: 0,
        SellerID: doc(this.firestore, 'Seller', currentSeller),
      };

      // this.seller.Products.push({Product_Id:doc(this.firestore,'Products',this.NewProd.id)})
      this.prodServ.addNewprod(this.NewProd).then(() => {
        form.reset();
       // alert('Product added Successfully');
        Swal.fire({
          icon: 'success',
          title: 'Product added Successfully',
          
        })
        this.location.back();
      });

      this.seller.Products.push({
        Product_Id: doc(this.firestore, 'Products', this.NewProd.id),
      });

      
    }
  }

  switchHandle() {
    if (this.decide == 'EN') {
      this.langDet = !this.langDet;
      let styled = document.getElementsByTagName('div');
      this.addProd = this.lang.addProdEn;
      this.prodName = this.lang.prodNameEn;
      this.enterProdName = this.lang.enterProdNameEn;
      this.prodQuant = this.lang.prodQuantEn;
      this.prodArName = this.lang.prodArNameEn;
      this.enterArProdName = this.lang.enterArProdNameEn;
      this.enterQuant = this.lang.enterQuantEn;
      this.prodPrice = this.lang.prodPriceEn;
      this.enterPrice = this.lang.enterPriceEn;
      this.prodLink = this.lang.prodLinkEn;
      this.enterLink = this.lang.enterLinkEn;
      this.availSize = this.lang.availSizeEn;
      this.dimensions = this.lang.dimensionsEn;
      this.Endescription = this.lang.EndescriptionEn;
      this.enterEnDesc = this.lang.enterEnDescEn;
      this.Ardescription = this.lang.ArdescriptionEn; 
      this.enterArDesc = this.lang.enterArDescEn;
      this.EnprodCat = this.lang.EnprodCatEn;
      this.ArProdCat = this.lang.ArProdCatEn;
      this.addEdit = this.lang.addEditEn;
      if (styled.length != 0) {
        for (let i = 0; i <= styled.length; i++) {
          styled[i].style.direction = 'ltr';
        }
      }
    } else if (this.decide == 'AR') {
      let styled = document.getElementsByTagName('div');
      this.addProd = this.lang.addProdAr;
      this.prodName = this.lang.prodNameAr;
      this.enterProdName = this.lang.enterProdNameAr;
      this.prodQuant = this.lang.prodQuantAr;
      this.prodArName = this.lang.prodArNameAr;
      this.enterArProdName = this.lang.enterArProdNameAr;
      this.enterQuant = this.lang.enterQuantAr;
      this.prodPrice = this.lang.prodPriceAr;
      this.enterPrice = this.lang.enterPriceAr;
      this.prodLink = this.lang.prodLinkAr;
      this.enterLink = this.lang.enterLinkAr;
      this.availSize = this.lang.availSizeAr;
      this.dimensions = this.lang.dimensionsAr;
      this.Endescription = this.lang.EndescriptionAr;
      this.enterEnDesc = this.lang.enterEnDescAr;
      this.Ardescription = this.lang.ArdescriptionAr;
      this.enterArDesc = this.lang.enterArDescAr;
      this.EnprodCat = this.lang.EnprodCatAr;
      this.ArProdCat = this.lang.ArProdCatAr;
      this.addEdit = this.lang.addEditAr;
      if (styled.length != 0) {
        for (let i = 0; i <= styled.length; i++) {
          styled[i].style.direction = 'rtl';
        }
      }
    }
  }
  onFileSelected(event) {
    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `Images/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`Images/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          console.log(this.downloadURL , "***")
          this.downloadURL.subscribe(url => {
            if (url) {
             this.NewProd.Image = url;
            }
            console.log(this.fb );
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log(url);
        }
      });
    }
}
