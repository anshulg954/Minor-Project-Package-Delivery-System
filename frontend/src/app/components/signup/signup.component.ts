import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators  } from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.signupForm = this.makeFormGroup();
  }

  makeFormGroup(): FormGroup {
    return new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      contact: new FormControl('', [Validators.required, Validators.minLength(10)]),
      password: new FormControl('',[Validators.required, Validators.minLength(5)])
  });
}
onSignUp(): void {
this.authService
.signup(this.signupForm.value)
.subscribe((msg)=>{
  console.log(msg);
}, (err)=>{
  console.log(err);
}
);
}

}


