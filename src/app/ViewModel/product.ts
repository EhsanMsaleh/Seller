import { DocumentReference } from "@angular/fire/compat/firestore";

export interface IProduct {
 
  id?: string,
    Name?: string,
    NameAr?:string,
    Description?:string,
    DescriptionAr?:string,
    Image?:string,
    Size?:string,
    Diemention?:string,
    Category?:string,
    CategoryAr?:string,
    Price?:number,
    Accepted?:boolean,
    Rank?:number,
    Quantity?:number,
    searchKey?:string[],
    SellerID?:any,
    

  };
  
