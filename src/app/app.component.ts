import { Component } from '@angular/core';

import { AngularFireDatabase } from '@angular/fire/database';

import { Router } from '@angular/router';

import { AuthenticationService } from './_services';

import { MessagingService } from './shared/messaging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FireBaseApp';
  currentUser: any;
  message;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private messagingService: MessagingService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    const userId = 'LpAyyRxXF6UjWH360E2';
    this.messagingService.requestPermission(userId);
    this.messagingService.receiveMessage();
    this.message = this.messagingService.currentMessage;
  }
  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
