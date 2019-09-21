import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {Notice} from '../models/notice';

@Injectable({ providedIn: 'root' })
export class NoticeService {

  private dbPath = '/notices';

  userRef: AngularFireList<Notice> = null;

  constructor(private db: AngularFireDatabase) {
    this.userRef = db.list(this.dbPath);
  }

  createNotice(notice: Notice): void {
    this.userRef.push(notice);
  }

  updateNotice(key: string, value: any): Promise<void> {
    return this.userRef.update(key, value);
  }

  deleteNotice(key: string): Promise<void> {
    return this.userRef.remove(key);
  }

  getNoticeList(): AngularFireList<Notice> {
    return this.userRef;
  }

  deleteAll(): Promise<void> {
    return this.userRef.remove();
  }
}
