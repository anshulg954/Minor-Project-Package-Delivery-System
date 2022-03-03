import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from "@angular/forms";
import { FeedbackService } from 'src/app/services/feedback.service';
  @Component({
    selector: "app-contact",
    templateUrl: './customer-feedback.component.html',
    styleUrls: ['./customer-feedback.component.scss'],
  })
  export class FeedbackComponent implements OnInit {
    feedbackForm!: FormGroup;
    constructor(private fbService:FeedbackService) {}

    ngOnInit(): void {
      this.feedbackForm = this.createFeedbackGroup();
    }
    createFeedbackGroup(): FormGroup {
      return new FormGroup({
        orderID: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        name: new FormControl('', [Validators.required]),
        subject: new FormControl('', [Validators.required]),
        message: new FormControl('', [Validators.required])
      });
    }
    onSubmitFeedback(): void {
      this.fbService
      .createDetailsForFeedback(this.feedbackForm.value)
      .subscribe(
        (msg) => {
          console.log(msg);
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
  