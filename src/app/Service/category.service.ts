import { ICategory } from './../ViewModel/category';
import { Firestore, collectionData, collection,collectionGroup, where,query } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
Category:Observable<ICategory[]>;
constructor(private firestore: Firestore) {
  const collectionseller:any = collection(firestore, 'Category');
    this.Category = collectionData(collectionseller);
 }

 getAllCategory(): Observable<ICategory[]>{
  const collectionseller:any = collection(this.firestore, 'Category');
   this. Category = collectionData(collectionseller);
   return this. Category
}
}
