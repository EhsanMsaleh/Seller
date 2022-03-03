import { DocumentReference } from "@angular/fire/compat/firestore";

export interface IProduct {
  
  id?: string;
    Name?: string,
    Description?:string,
    Image?:string,
    Size?:string,
    Diemention?:string,
    Category?:string,
    Price?:number,
    Accepted?:boolean,
    Rank?:number,
    Quantity?:number,
    SellerID?:DocumentReference,
    searchKey?:string[]

  };
  
