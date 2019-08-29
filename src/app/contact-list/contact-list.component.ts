import { Component, OnInit } from "@angular/core";
import { ContactServiceService } from "../contact-service.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-contact-list",
  templateUrl: "./contact-list.component.html",
  styleUrls: ["./contact-list.component.css"]
})
export class ContactListComponent implements OnInit {
  contactList = [];
  contactListModel: any = {};
  constructor(
    private contactServiceService: ContactServiceService,
    private router: Router
  ) {}

  ngOnInit() {
    this.contactList = this.contactServiceService.contactList;
  }

  clearFilter() {
    this.contactListModel = {};
  }

  editContact(contact, contactIndex) {
    this.contactServiceService.changeCurrentAddOrEdit("Edit Contact");
    this.contactServiceService.contactToEdit = contact;
    this.contactServiceService.editIndex = contactIndex;
    this.router.navigateByUrl("/edit-contact");
  }

  deleteContact(contactIndex) {
    this.contactServiceService.contactList.splice(contactIndex, 1);
    localStorage.setItem(
      "contactListSaved",
      JSON.stringify(this.contactServiceService.contactList)
    );
    this.contactList = this.contactServiceService.contactList;
    this.contactServiceService.changeNotification({
      notificationType: "success",
      notificationMessage: "Success ! Contact Deleted Successfully "
    });
  }
}
