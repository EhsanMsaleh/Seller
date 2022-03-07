import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAnalytics,getAnalytics,ScreenTrackingService,UserTrackingService } from '@angular/fire/analytics';
import { provideAuth,getAuth,Auth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideRemoteConfig,getRemoteConfig } from '@angular/fire/remote-config';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { MainPageComponent } from './components/main-page/main-page.component';
import { MyOrderComponent } from './components/my-order/my-order.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { MySellesComponent } from './components/my-selles/my-selles.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ProductComponent } from './components/product/product.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { AngularFireModule } from '@angular/fire/compat';
import{LoginComponent} from './components/Login/Login.component'
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductsDetailedComponent } from './components/products-detailed/products-detailed.component';
import { SellerHomeComponent } from './components/seller-home/seller-home.component';
import{Seller_FormComponent} from './components/Seller_Form/Seller_Form.component';
@NgModule({
  declarations: [
    AppComponent,
    Seller_FormComponent,
    LoginComponent,
    MainPageComponent,
    MyOrderComponent,
    MyProfileComponent,
    MySellesComponent,
    NavBarComponent,
    ProductComponent,
    ProductDetailsComponent,
    ProductFormComponent,
    NotFoundPageComponent,
    ProductsDetailedComponent,
    SellerHomeComponent,
   
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAnalytics(() => getAnalytics()),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    provideRemoteConfig(() => getRemoteConfig()),
    provideStorage(() => getStorage()),
    AngularFireModule.initializeApp(environment.firebase),
    NgbModule,
    

  ],
  providers: [
    ScreenTrackingService,UserTrackingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
