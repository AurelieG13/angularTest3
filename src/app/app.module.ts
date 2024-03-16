import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HeaderComponent } from './_components/header/header.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './_components/footer/footer.component';
import { SidebarComponent } from './_components/sidebar/sidebar.component';
import { ContactComponent } from './contact/contact.component';
import { SportComponent } from './sport/sport.component';
import { PanierComponent } from './panier/panier.component';
import { BookingComponent } from './booking/booking.component';
import { PaymentComponent } from './payment/payment.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    SidebarComponent,
    ContactComponent,
    SportComponent,
    PanierComponent,
    BookingComponent,
    PaymentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
