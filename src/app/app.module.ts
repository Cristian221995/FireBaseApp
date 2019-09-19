import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NoticeComponent} from './components/notice/notice.component';
import { FormNoticeComponent } from './components/form-notice/form-notice.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { appRoutingModule } from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    NoticeComponent,
    FormNoticeComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    appRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
