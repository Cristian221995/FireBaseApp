import { Component, OnInit } from '@angular/core';
import { Notice } from '../../models/notice';
import { NoticeService } from '../../_services/notice.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Notification} from '../../models/notification';
import {HttpClient, HttpClientModule, HttpHeaders} from '@angular/common/http';
import { MessagingService} from '../../shared/messaging.service';

@Component({
  selector: 'app-form-notice',
  templateUrl: './form-notice.component.html',
  styleUrls: ['./form-notice.component.css']
})
export class FormNoticeComponent implements OnInit {
  url = 'https://fcm.googleapis.com/fcm/send';
  noticeForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private noticeService: NoticeService, private http: HttpClient, private messagingService: MessagingService) {
    // @ts-ignore
    // this.noticeForm = new FormGroup();
  }

  ngOnInit() {
    this.noticeForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
    });
  }

  async addNotice(title, description, date, event) {
    let notice = new Notice();
    notice.title = title;
    notice.description = description;
    notice.date = date;
    this.noticeService.createNotice(notice);


    let notification = new Notification();
    notification.title = "FireApp Utn";
    notification.body = "Se ha cargado una noticia: " + title;
    console.log(this.messagingService.token);
    let body = {
      'notification': {
        'title': notification.title,
        'body': notification.body
      },
      'to': 'cyb4hOBrkmo:APA91bGmFOGevj59m7SmkkFkXDsL9u4EV2Y5p7gA9RaTlwO62yQUFn_yi9zmXDJ06TKkRjOjQ1Rr_wm8L4i4gdo8iR3U7Kb9bL5OjygcWDWNmHpi6OLnmEPfT-PKjq487argq3fXdwH0',

    };
    console.log(body);
    const httpOptions = {
      headers : new HttpHeaders({
          'Content-Type': 'application/json'
        }
      )};
    // let headers = new HttpHeaders().set('Content-Type', 'application/json');
    console.log(httpOptions);
    return this.http.post(this.url, body, httpOptions);


    //let headers = new HttpHeaders();
    //headers.set('Content-Type', 'application/json');
    //headers.set('Authorization', 'key=AAAAGgM5N7Y:APA91bGaxyOnJWSJZFcNKBGWLV85i00gvtsf7KSw4mg98W1hhtf5nnpOrW0Yd-tR9_fd5QBpabcX5VBzCX78JA28TK5SsNftov8RuoVgxXuNpBc13T011PjvNTX8bOg4p9QJ0AGtdRd-');

    //return this.http.post(this.url, body , {headers: headers});
  }
}
