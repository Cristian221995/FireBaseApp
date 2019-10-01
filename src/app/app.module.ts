import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
import { fakeBackendProvider } from './_helpers';
import { AppComponent } from './app.component';
import { NoticeComponent} from './components/notice/notice.component';
import { FormNoticeComponent } from './components/form-notice/form-notice.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { appRoutingModule } from './app.routing';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AlertComponent } from './components/alert/alert.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { MessagingService } from './shared/messaging.service';
import { AsyncPipe } from '../../node_modules/@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    NoticeComponent,
    FormNoticeComponent,
    LoginComponent,
    RegisterComponent,
    NavComponent,
    HomeComponent,
    AlertComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    appRoutingModule,
    NgbDropdownModule,
    FormsModule,
    AngularFireAuthModule,
    AngularFireMessagingModule
  ],
  providers: [MessagingService, AsyncPipe,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    fakeBackendProvider
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
