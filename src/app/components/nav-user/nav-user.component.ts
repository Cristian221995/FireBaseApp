import {Component, Input, OnInit} from '@angular/core';
import { AuthenticationService, AlertService } from '../../_services';

@Component({
  selector: 'app-nav-user',
  templateUrl: './nav-user.component.html',
  styleUrls: ['./nav-user.component.css']
})
export class NavUserComponent implements OnInit {
  @Input()
  currentUser;

  constructor(private authenticationService: AuthenticationService,
              private alertService: AlertService) {
  }
  logOut() {
    this.authenticationService.logout();
    window.location.reload();
  }

  ngOnInit() {
  }

}
