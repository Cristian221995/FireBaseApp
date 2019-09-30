import {Component, Input, OnInit} from '@angular/core';
import { AuthenticationService, AlertService } from '../../_services';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
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
