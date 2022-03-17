import {ADSService} from './Service/ads.service';
import {  OnDestroy,Component, OnInit } from '@angular/core';
import {  Subscription } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit , OnDestroy{
  title='Seller';
  lang:string;
  private subscriptions: Subscription[] = [];

 
  public ads:string="";
  constructor(private Ads: ADSService) {
   
   }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
 
  ngOnInit() { 
if(!localStorage.getItem('lang'))
{
  localStorage.setItem('lang','EN')
}
   

    let observerAds = {
      next: (ads: string) => {
        this.ads=ads;
      },
      error: (err: string) => {
        console.log(err);
      },
      complete: () => {
        console.log("Finsihed!")
      }
      
      
    };
 
  
    let getAds = this.Ads.displayAds(1);
    let adsSubscription=getAds.subscribe(observerAds);
    this.subscriptions.push(adsSubscription);

  }


}