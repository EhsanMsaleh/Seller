import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthSellerService } from './authSeller.service';
import { SellerService } from './seller.service';
import {Seller} from '../ViewModel/seller'
import { ISeller } from './../ViewModel/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
    //in this service we will search for the seller and get his id to get the data
id:string=''
loggedToken: string=''
IsActive:boolean;
constructor(private sellerServ: AuthSellerService, private db: AngularFirestore) { }

getSeller(){
  this.id=this.sellerServ.getSellerId()
  console.log(this.id)
 this.loggedToken=this.id
 return this.db.collection<Seller>('Seller').doc(this.id).snapshotChanges()
}

}
 