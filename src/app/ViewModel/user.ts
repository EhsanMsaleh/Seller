import { DocumentReference } from "@angular/fire/compat/firestore";

export interface ISeller {
    firstname?: string,
    lastname?:string,
    email?:string,
    isSeller?:boolean,
    password?:string,
    phone?:string,
    Product?:[{Product_Id:DocumentReference}]
  };
  
