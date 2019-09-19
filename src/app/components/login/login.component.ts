import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {first, map} from 'rxjs/operators';
import { UserServiceDB } from '../../models/user.service';

import { AuthenticationService, AlertService } from '../../_services';
import {environment} from '../../../environments/environment';
import {redirectLoggedInTo} from '@angular/fire/auth-guard';
import {Observable} from 'rxjs';

@Component({templateUrl: 'login.component.html',
  // tslint:disable-next-line:component-selector
            selector: 'login-app'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  username: string;
  password: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userServiceDB: UserServiceDB,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });

    // Para la DB de Firebase
    this.userServiceDB.getUsersList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val()})
        )
      )
    ).subscribe(
      data => {
        data.forEach( x => {
          if (x.username === this.username && x.password === this.password) {
            this.authenticationService.login(this.username, this.password);
          }
        });
      },
      error => {
        this.alertService.error(error);
        this.loading = false;
      });
  }
}
