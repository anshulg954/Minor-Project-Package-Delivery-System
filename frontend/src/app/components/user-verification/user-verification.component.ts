import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-verification',
  templateUrl: './user-verification.component.html',
  styleUrls: ['./user-verification.component.scss']
})
export class UserVerificationComponent implements OnInit {

  contactVerification!: FormGroup;
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.contactVerification = this.makeFormGroup();
  }

  makeFormGroup(): FormGroup {
    return new FormGroup({
      otp: new FormControl('', [Validators.required, Validators.minLength(6)]),
      contact: new FormControl('', [Validators.required, Validators.minLength(10)])

  });
}
onVerify(): void {
this.authService
.verify(this.contactVerification.value.otp, this.contactVerification.value.contact, String(localStorage.getItem('email')))
.subscribe((msg)=>{
  console.log(msg);
}, (err)=>{
  console.log(err);
}
);
}

}
