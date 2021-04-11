import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/shared/header/header.component';
import { FooterComponent } from './component/shared/footer/footer.component';
import { NavComponent } from './component/shared/nav/nav.component';
import { FilterComponent } from './component/shopping-main/filter/filter.component';
import { ProductListComponent } from './component/shopping-main/product-list/product-list.component';
import { CartComponent } from './component/shopping-main/cart/cart.component';
import { ShoppingMainComponent } from './component/shopping-main/shopping-main.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { PageNoFoundComponent } from './component/page-no-found/page-no-found.component';
import { ProductItemComponent } from './component/shopping-main/product-list/product-item/product-item.component';
import { CartItemComponent } from './component/shopping-main/cart/cart-item/cart-item.component';
import { ApplyEmiComponent } from './component/shopping-main/apply-emi/apply-emi.component';
import { ViewDetailsComponent } from './component/shopping-main/view-details/view-details.component';
import { ForgotPasswordComponent } from './component/login/forgot-password/forgot-password.component';
import { EmiCardComponent } from './component/shopping-main/emi-card/emi-card.component';
import { OrderHistoryComponent } from './component/shopping-main/order-history/order-history.component';





@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    ProductListComponent,
    FilterComponent,
    CartComponent,
    ShoppingMainComponent,
    LoginComponent,
    RegisterComponent,
    PageNoFoundComponent,
    ProductItemComponent,
    CartItemComponent,
    ApplyEmiComponent,
    ViewDetailsComponent,
    ForgotPasswordComponent,
    EmiCardComponent,
    OrderHistoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
