import {Component, Inject, OnInit} from '@angular/core';
import {OKTA_AUTH, OktaAuthStateService} from "@okta/okta-angular";
import {OktaAuth} from "@okta/okta-auth-js";

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css']
})
export class LoginStatusComponent implements OnInit {

  isAuthenticated: boolean = false;
  userFullName: string = '';

  storage: Storage = sessionStorage;

  constructor(private oktaAuthService: OktaAuthStateService,
              @Inject(OKTA_AUTH) private oktaAuth: OktaAuth) {

  }

  ngOnInit(): void {

    // subscribe to authentication state changes
    this.oktaAuthService.authState$.subscribe(
        (result) => {
          this.isAuthenticated = result.isAuthenticated as boolean;
          this.getUserDetails();
        }
    );
  }

  getUserDetails() {
    if (this.isAuthenticated) {
      this.oktaAuth.getUser().then(
          (res) => {
            this.userFullName = res.name as string;
            const email = res.email;

            this.storage.setItem('userEmail', JSON.stringify(email));
          }
      );
    }
  }

  logout() {
    // terminates the session with Okta and removes current tokens
    this.oktaAuth.signOut();
  }

}
