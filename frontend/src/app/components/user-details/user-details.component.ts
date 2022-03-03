import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { UserDetailsService } from 'src/app/services/user-details.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit {
  userDetails!: FormGroup;
  constructor(private userService: UserDetailsService) {}

  ngOnInit(): void {
    this.userDetails = this.makeFormGroup();
  }

  makeFormGroup(): FormGroup {
    return new FormGroup({
      email: new FormControl(String(localStorage.getItem('email')), [Validators.required]),
      address: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      zip: new FormControl('', [Validators.required, Validators.minLength(5)]),
    });
  }
  onCreatingDetails(): void {
    this.userService.addDetails(this.userDetails.value).subscribe(
      (msg) => {
        console.log(msg);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
