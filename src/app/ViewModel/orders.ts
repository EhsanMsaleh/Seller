export interface Orders {
    Total:number,
    buyer:string,
    date:string,
    status:boolean,
    Product:[
        {
            Product_Id:string,
            Product_Quantity:number,
            Total_Price:number
        }
    ]
}
