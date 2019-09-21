import { Component, OnInit } from '@angular/core';
import { Notice } from '../../models/notice';
import { NoticeService } from '../../_services/notice.service';

@Component({
  selector: 'app-form-notice',
  templateUrl: './form-notice.component.html',
  styleUrls: ['./form-notice.component.css']
})
export class FormNoticeComponent implements OnInit {
  noticeService: NoticeService;
  constructor() { }
  addNotice(title, description, date) {
    const notice = new Notice();
    notice.title = title;
    notice.description = description;
    notice.date = date;
    this.noticeService.createNotice(notice);
  }

  ngOnInit() {
  }

}
