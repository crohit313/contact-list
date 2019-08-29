import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm, FormGroup, FormControl } from "@angular/forms";
import { ContactServiceService } from "../contact-service.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-add-contact",
  templateUrl: "./add-contact.component.html",
  styleUrls: ["./add-contact.component.css"]
})
export class AddContactComponent implements OnInit {
  @ViewChild("contactForm") contactFormData: NgForm;
  defaultOrEditStatus = "active";
  contactList = [];
  submitOrUpdate = "Add";
  currentComponentType = "Add Contact";
  contactToEdit: any = {};
  editIndex = -1;
  constructor(
    private contactServiceService: ContactServiceService,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.router.url.includes("edit-contact")) {
      this.currentComponentType = "Edit Contact";
      this.submitOrUpdate = "Update";
      this.contactToEdit = this.contactServiceService.contactToEdit;
      this.editIndex = this.contactServiceService.editIndex;
      this.defaultOrEditStatus = this.contactToEdit["status"];
    }
    this.contactList = this.contactServiceService.contactList;
  }

  addContact() {
    if (this.submitOrUpdate == "Add") {
      this.addToContacts();
    } else {
      this.updateContacts();
    }
  }

  addToContacts() {
    if (this.validateContact(this.contactFormData.form.value)) {
      this.contactServiceService.contactList.push(
        this.contactFormData.form.value
      );
    }
    localStorage.setItem(
      "contactListSaved",
      JSON.stringify(this.contactServiceService.contactList)
    );
    this.contactServiceService.changeNotification({
      notificationType: "success",
      notificationMessage: "Success ! Contact Added Successfully "
    });

    this.resetContactForm();
    this.router.navigateByUrl("/contact-list");
  }

  updateContacts() {
    this.contactServiceService.contactList.splice(this.editIndex, 1);
    if (this.validateContact(this.contactFormData.form.value)) {
      this.contactServiceService.contactList.splice(
        this.editIndex,
        0,
        this.contactFormData.form.value
      );
      localStorage.setItem(
        "contactListSaved",
        JSON.stringify(this.contactServiceService.contactList)
      );
      this.submitOrUpdate = "Add";
      this.contactServiceService.changeCurrentAddOrEdit("Add Contact");
      this.resetContactForm();
      this.contactServiceService.changeNotification({
        notificationType: "success",
        notificationMessage: "Success ! Contact updated Successfully "
      });
      this.router.navigateByUrl("/contact-list");
    }
  }

  resetContactForm() {
    this.contactFormData.reset();
  }

  validateContact(contact): boolean {
    for (let registeredContact of this.contactList) {
      if (contact.phoneNumber == registeredContact.phoneNumber) {
        this.contactServiceService.changeNotification({
          notificationType: "error",
          notificationMessage: "Phone number already Exists !"
        });
        return false;
      }
      if (contact.email == registeredContact.email) {
        this.contactServiceService.changeNotification({
          notificationType: "error",
          notificationMessage: "Email ID already Exists !"
        });
        return false;
      }
    }
    return true;
  }
}
