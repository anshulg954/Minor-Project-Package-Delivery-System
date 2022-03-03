import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  loginStatus!: boolean;
  userName!: string;

  constructor(private route: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.loginStatus = this.authService.isUserLoggedIn();
    this.userName = this.authService.getUserName();
    console.log(this.userName);
    console.log(this.loginStatus);
  }

  onLogOut(): void {
    this.authService.logout();
  }
}
