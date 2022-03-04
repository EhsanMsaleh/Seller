import { DocumentReference } from "@angular/fire/compat/firestore";

export interface Orders {
    Total:number,
    buyer:string,
    date:string,
    status:boolean,
    Product:[
        {
            Product_Id:DocumentReference,
            Product_Quantity:number,
            Total_Price:number
        }
    ]
}
