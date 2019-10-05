import { Component, OnInit } from '@angular/core';
import {NoticeService} from '../../_services/notice.service';
import {Notice} from '../../models/notice';
import {AngularFireList} from '@angular/fire/database';
import {not} from "rxjs/internal-compatibility";

@Component({
  selector: 'app-notice',
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.css']
})
export class NoticeComponent implements OnInit {
  array = new Array();
  constructor(private noticeService: NoticeService) { }

  ngOnInit() {
    const s = this.noticeService.getNoticeList();
    s.snapshotChanges().subscribe(data => {
      data.forEach(item => {
        let notice = new Notice();
        let a = item.payload.toJSON();
        notice.title = a['title'];
        notice.description = a['description'];
        notice.date = a['date'];
        this.array.unshift(notice);
      });
    });
  }

}
