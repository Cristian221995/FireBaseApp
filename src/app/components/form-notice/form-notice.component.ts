import { Component, OnInit } from '@angular/core';
import { Notice } from '../../models/notice';
import { NoticeService } from '../../_services/notice.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-form-notice',
  templateUrl: './form-notice.component.html',
  styleUrls: ['./form-notice.component.css']
})
export class FormNoticeComponent implements OnInit {
  noticeForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private noticeService: NoticeService) {
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
  addNotice(title, description, date) {
    let notice = new Notice();
    notice.title = title;
    notice.description = description;
    notice.date = date;
    this.noticeService.createNotice(notice);
  }
}
