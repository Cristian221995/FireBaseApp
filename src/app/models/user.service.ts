import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { User } from './user';

@Injectable({ providedIn: 'root' })
export class UserServiceDB {

  private dbPath = '/users';

  userRef: AngularFireList<User> = null;

  constructor(private db: AngularFireDatabase) {
    this.userRef = db.list(this.dbPath);
  }

  createUser(user: User): void {
    this.userRef.push(user);
  }

  updateUser(key: string, value: any): Promise<void> {
    return this.userRef.update(key, value);
  }

  deleteUser(key: string): Promise<void> {
    return this.userRef.remove(key);
  }

  getUsersList(): AngularFireList<User> {
    return this.userRef;
  }

  deleteAll(): Promise<void> {
    return this.userRef.remove();
  }
}
