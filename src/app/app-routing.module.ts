import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import {ProductFormComponent} from './components/product-form/product-form.component';
import {MainPageComponent} from './components/main-page/main-page.component';
import {AppComponent} from './app.component';
import {MySellesComponent} from './components/my-selles/my-selles.component';
import {MyOrderComponent} from './components/my-order/my-order.component';
import {ProductComponent} from './components/product/product.component';
import {ProductDetailsComponent} from './components/product-details/product-details.component'
import {MyProfileComponent} from './components/my-profile/my-profile.component';
import{NotFoundPageComponent} from './components/not-found-page/not-found-page.component';
import {OrderDetailsComponent} from './components/OrderDetails/OrderDetails.component';
import{LoginComponent} from './components/Login/Login.component';
import {AuthSellerGuard} from './Gaurds/auth-seller.guard';
import { ProductsDetailedComponent } from './components/products-detailed/products-detailed.component';
import { SellerHomeComponent } from './components/seller-home/seller-home.component';
const routes: Routes = [
  {path: '', component: LoginComponent, children:[
   
    
  ]},
   {path: '', redirectTo: '/Login', pathMatch: 'full'}, 
    {path: 'Home', component:MainPageComponent ,canActivate:[AuthSellerGuard] },
    {path: 'Products', component: ProductComponent ,canActivate:[AuthSellerGuard]},
    {path: 'Products/:pid', component: ProductDetailsComponent ,canActivate:[AuthSellerGuard] },
    {path: 'Selles', component: MySellesComponent ,canActivate:[AuthSellerGuard]  },
     {path: 'Orders', component: MyOrderComponent ,canActivate:[AuthSellerGuard]  },
     {path: 'Orders/:pid', component: OrderDetailsComponent ,canActivate:[AuthSellerGuard] },
     {path: 'Account', component: MyProfileComponent ,canActivate:[AuthSellerGuard]},
     {path: 'detailed', component: ProductsDetailedComponent,canActivate:[AuthSellerGuard]},
     //{path:'order', component:OrderDetailsComponent,canActivate:[AuthSellerGuard]},
  {path:'Add', component:ProductFormComponent,canActivate:[AuthSellerGuard] },
  {path:'Update/:pid', component:ProductFormComponent,canActivate:[AuthSellerGuard] },
 
  {path:'Login', component:LoginComponent},
  {path:'main', component:SellerHomeComponent,canActivate:[AuthSellerGuard]},
   {path: '**', component:NotFoundPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
