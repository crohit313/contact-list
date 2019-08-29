import { Injectable, OnInit } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ContactServiceService {
  editIndex = -1;
  contactToEdit = {};
  contactList = [];
  addOrEdit = new BehaviorSubject<string>("Add Contact");
  currentAddOrEdit = this.addOrEdit.asObservable();

  changeCurrentAddOrEdit(addOrEdit: string) {
    this.addOrEdit.next(addOrEdit);
  }

  notification = new BehaviorSubject<any>({
    notificationMessage: "",
    notificationType: null
  });
  currentNotification = this.notification.asObservable();

  changeNotification(notification: {}) {
    this.notification.next(notification);
  }

  constructor() {}
}
