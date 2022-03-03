import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthSellerService {
private IslogSub: BehaviorSubject<boolean>;
constructor() {
  this.IslogSub=new BehaviorSubject<boolean> (this.IsUserLogged);
 }

 login(Name:string,password:string)
{
   let token="110111010";
   localStorage.setItem("TOKEN",token);
   this.IslogSub.next(true);
}
logout()
{
  localStorage.removeItem("TOKEN");
  this.IslogSub.next(false);
}

get IsUserLogged():boolean
{
  return  (localStorage.getItem('TOKEN'))? true: false
}

getloggedStatus(): Observable<boolean>
  {
    return this.IslogSub.asObservable();
  }
}
