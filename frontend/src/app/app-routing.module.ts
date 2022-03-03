import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserVerificationComponent } from './components/user-verification/user-verification.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { DisplayOrderDetailsComponent } from './components/display-order-details/display-order-details.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { DisplayUserDetailsComponent } from './components/display-user-details/display-user-details.component';
import { FeedbackComponent } from './components/feedback/customer-feedback.component';
import { AuthguardService } from './services/authguard.service';
import { DisplayCustomerFeedbacks } from './components/display-customer-feedbacks/display-customer-feedbacks.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component:HomeComponent},
  { path: 'signup', component:SignupComponent},
  { path:'login', component:LoginComponent},
  { path:'user-verification', component:UserVerificationComponent},
  { path: 'user-details', component:UserDetailsComponent, canActivate:[AuthguardService]},
  { path: 'order-details', component:OrderDetailsComponent, canActivate:[AuthguardService]},
  { path:'get-order-details', component:DisplayOrderDetailsComponent, canActivate:[AuthguardService]},
  { path:"confirmation", component:ConfirmationComponent, canActivate:[AuthguardService]},
  { path:"show-user-details", component:DisplayUserDetailsComponent, canActivate:[AuthguardService]},
  { path: 'feedback', component:FeedbackComponent, canActivate:[AuthguardService]},
  { path: 'show-customer-feedbacks', component:DisplayCustomerFeedbacks, canActivate:[AuthguardService]},
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
