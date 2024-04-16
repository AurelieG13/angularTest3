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
import { UserdashboardComponent } from './userdashboard/userdashboard.component';
import { EditprofiluserComponent } from './editprofiluser/editprofiluser.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { AuthGuard } from './guard.guard';
import { SportFormComponent } from './sport/sport-form/sport-form.component';
import { UserListAdminComponent } from './admindashboard/user-list-admin/user-list-admin.component';
import { SportadminComponent } from './admindashboard/sportadmin/sportadmin.component';

const routes: Routes = [
  { path:"home", component: HomeComponent},
  { path:"contact", component: ContactComponent},
  { path:"sports", component: SportComponent},
  { path:"booking", component: BookingComponent, canActivate: [AuthGuard]},
  { path:"panier", component: PanierComponent, canActivate: [AuthGuard]},
  { path:"payment", component: PaymentComponent, canActivate: [AuthGuard]},
  { path:"login", component: LoginComponent},
  { path:"register",component: RegisterComponent },
  { path:"admindashboard", component: AdmindashboardComponent, canActivate: [AuthGuard]},
  { path:"sportCreate", component: SportFormComponent, canActivate: [AuthGuard]},
  { path:"userListAdmin", component: UserListAdminComponent, canActivate: [AuthGuard]},
  { path:"sportListAdmin", component: SportadminComponent, canActivate: [AuthGuard]},
  { path:"userdashboard", component: UserdashboardComponent, canActivate: [AuthGuard]},
  { path:"editprofiluser", component: EditprofiluserComponent, canActivate: [AuthGuard]},
  { path:"**", redirectTo: "home", pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
