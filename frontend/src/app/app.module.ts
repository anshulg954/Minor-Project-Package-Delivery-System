import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';


import { NavComponent } from './components/nav/nav.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component'
import { LoginComponent } from './components/login/login.component';
import { UserVerificationComponent } from './components/user-verification/user-verification.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { DisplayOrderDetailsComponent } from './components/display-order-details/display-order-details.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { DisplayUserDetailsComponent } from './components/display-user-details/display-user-details.component';
import { AuthService } from './services/auth.service';
import { AuthguardService } from './services/authguard.service';
import { DisplayCustomerFeedbacks } from './components/display-customer-feedbacks/display-customer-feedbacks.component';
import { FeedbackComponent } from './components/feedback/customer-feedback.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    SignupComponent,
    HomeComponent,
    LoginComponent,
    UserVerificationComponent,
    UserDetailsComponent,
    OrderDetailsComponent,
    DisplayOrderDetailsComponent,
    ConfirmationComponent,
    DisplayUserDetailsComponent,
    FeedbackComponent,
    DisplayCustomerFeedbacks,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [AuthService, AuthguardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
