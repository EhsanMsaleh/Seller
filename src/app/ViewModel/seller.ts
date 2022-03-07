import { DocumentReference } from "@angular/fire/compat/firestore"

export interface Seller {

    CompanyName: string,
    Email:string,
    FirstName:string,
    LastName:string,
    IsActive:boolean,
    IsNew:boolean,
    Password:string,
    Phone: string,
    Rate: number,
    Address:[
        {BulNo: string,
        City:string,
        Street:string,}
    ],
    Orders:[
        {Date:Date,
        Product:DocumentReference,
        Quantity:number,
        UserName:string,
        }
    ],
    Payment:[
        {
            CVV:string,
            CardHolderName:string,
            CreditCard: string,
        }
    ],
    Products:[
        {
            Product_Id:DocumentReference
        }
    ]

}
