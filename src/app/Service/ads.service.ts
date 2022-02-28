import { Injectable } from '@angular/core';
import { from, Observable, of} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ADSService {
  public Ads:string[];
  constructor() { 
    this.Ads=
    [
      "https://eg.jumia.is/cms/8-22/ADS/Andora/Floor-Desktop-en_copy_5-(10).jpg",
      "https://eg.jumia.is/cms/8-22/ADS/l'oreal-elvive-NEW/Floor-Desktop-en_copy_5-(11)-(1).jpg",
      "https://eg.jumia.is/cms/8-22/UN-Deals/Personal-Care/Floors/Dove-_Floor-Desktop_-EN.jpg",
      "https://eg.jumia.is/cms/8-22/UN-Deals/NEW/cif_-_Floor-Desktop_-EN__copy_2.jpg",
      "https://eg.jumia.is/cms/8-22/UN-Deals/F&B/Floors/Cadbury_-_Floor-Desktop_-EN__copy_4.jpg",
  "https://eg.jumia.is/cms/8-22/UN-Deals/F&B/Floors/Cadbury_-_Floor-Desktop_-EN__copy_3.jpg",
  "https://eg.jumia.is/cms/5-22/ADS/-Samsumg/Slider-Desktop-EN__copy_6.jpg",
  "https://eg.jumia.is/cms/8-22/UNs/F&B/Slider-Desktop-EN_-(6).jpg",
  "https://eg.jumia.is/cms/8-22/UNs/Personal-Care/Slider-Desktop-EN_-(7).jpg",
  "https://eg.jumia.is/cms/7-22/JPAY/Aman/712_x_384_en-(1).png"
];
  }

  displayAds(timer:number) : Observable<string>
  {  return new Observable <string>((Inobserve)=>{
    let counter=0;
       let interval= setInterval(()=>{
       if (counter==this.Ads.length)
       { Inobserve.complete();  }
       if(this.Ads[counter] =="")
       {Inobserve.error("Error In interval");  }
       Inobserve.next(this.Ads[counter]);
       counter++;
    
     },timer*5000);

 
  return {
   unsubscribe(){
    
     clearInterval(timer);
     console.log("In Obs Unsubscribe...")
   }
 }
});
  }
}
