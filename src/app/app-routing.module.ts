import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { PageNoFoundComponent } from './component/page-no-found/page-no-found.component';
import { RegisterComponent } from './component/register/register.component';
import { CartComponent } from './component/shopping-main/cart/cart.component';
import { ApplyEmiComponent } from './component/shopping-main/apply-emi/apply-emi.component'
import { EmiCardComponent } from './component/shopping-main/emi-card/emi-card.component';
import { ShoppingMainComponent } from './component/shopping-main/shopping-main.component';
import { ViewDetailsComponent } from './component/shopping-main/view-details/view-details.component';
import { ForgotPasswordComponent } from './component/login/forgot-password/forgot-password.component';
import { AdminLoginComponent } from './component/login/admin-login/admin-login.component';
import { OrderHistoryComponent } from './component/shopping-main/order-history/order-history.component';
import { LandingComponent } from './landing/landing.component';

const routes: Routes = [
  //{ path : '' , component: ShoppingMainComponent },
  { path : '', component: LandingComponent },
  { path : 'Login', component : LoginComponent},
  { path : 'Register' , component : RegisterComponent},
  { path : 'Cart', component : CartComponent},
  { path : 'Apply', component : ApplyEmiComponent},
  { path : 'CardDetails', component : EmiCardComponent},
  { path : 'View-Details', component : ViewDetailsComponent},
  { path : 'Order-History', component : OrderHistoryComponent},
  { path : 'forgot-password',component:ForgotPasswordComponent},
  { path : 'admin-login' ,component:AdminLoginComponent},
  { path : 'emi-card' ,component:EmiCardComponent },
  { path : '**', component : PageNoFoundComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
