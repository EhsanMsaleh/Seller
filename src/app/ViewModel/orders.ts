import { DocumentReference } from "@angular/fire/compat/firestore";

export interface Orders {
    Total?:number,
    buyer?:DocumentReference,
    date?:string,
    status?:boolean,
    Product?:[
        {
            Product_Id?:DocumentReference,
            Product_Quntity?:number,
            Total_Price?:number
            Seller_ID?:string
            notRecieved?:boolean
        }
    ]
}
