import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { UserService, AuthenticationService } from '../../_services';
import { MessagingService } from '../../shared/messaging.service';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit {
  currentUser: any;
  users = JSON.parse(localStorage.getItem('users'));
  message;

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private messagingService: MessagingService
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
    const userId = this.users.key;
    this.messagingService.requestPermission(userId);
    this.messagingService.receiveMessage();
    this.message = this.messagingService.currentMessage;
  }

  ngOnInit() {
    this.loadAllUsers();
  }

  deleteUser(id: number) {
    this.userService.delete(id)
      .pipe(first())
      .subscribe(() => this.loadAllUsers());
  }

  private loadAllUsers() {
    this.userService.getAll()
      .pipe(first())
      .subscribe(users => this.users = users);
  }
}
