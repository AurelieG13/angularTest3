import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { SportComponent } from './sport/sport.component';
import { PanierComponent } from './panier/panier.component';
import { BookingComponent } from './booking/booking.component';
import { PaymentComponent } from './payment/payment.component';

const routes: Routes = [
  { path:"home", component: HomeComponent},
  { path:"contact", component: ContactComponent},
  { path:"sports", component: SportComponent},
  { path: "booking", component: BookingComponent},
  { path:"panier", component: PanierComponent},
  { path: "payment", component: PaymentComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register',component: RegisterComponent },
  { path:"**", redirectTo: "home", pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
