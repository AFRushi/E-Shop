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
import { OrderHistoryComponent } from './component/shopping-main/order-history/order-history.component';
import { SideBarComponent } from './component/shared/nav/side-bar/side-bar.component';
import { CheckoutComponent } from './component/shopping-main/checkout/checkout.component';
import { AboutUsComponent } from './component/shopping-main/about-us/about-us.component';

const routes: Routes = [
  { path : '' , component: ShoppingMainComponent },
  { path : 'Login', component : LoginComponent},
  { path : 'Register' , component : RegisterComponent},
  { path : 'Cart', component : CartComponent},
  { path : 'Apply', component : ApplyEmiComponent},
  { path : 'CardDetails', component : EmiCardComponent},
  { path : 'View-Details', component : ViewDetailsComponent},
  { path : 'Order-History', component : OrderHistoryComponent},
  { path : 'Side-Bar', component : SideBarComponent},
  { path : 'Checkout', component : CheckoutComponent},
  { path : 'About-Us', component : AboutUsComponent},
  { path : 'forgot-password',component:ForgotPasswordComponent},
  { path : '**', component : PageNoFoundComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
