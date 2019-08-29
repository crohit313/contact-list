import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { AddContactComponent } from "./add-contact.component";
import { RouterTestingModule } from "@angular/router/testing";
import { BrowserModule } from "@angular/platform-browser";
import { ContactServiceService } from "../contact-service.service";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";

describe("AddContactComponent", () => {
  let component: AddContactComponent;
  let fixture: ComponentFixture<AddContactComponent>;
  let contactServiceService;
  let router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddContactComponent],
      imports: [RouterTestingModule, BrowserModule, FormsModule],
      providers: [ContactServiceService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddContactComponent);
    component = fixture.componentInstance;
    contactServiceService = TestBed.get(ContactServiceService);
    router = TestBed.get(Router);
    fixture.detectChanges();
    contactServiceService.contactToEdit = {
      firstName: "Rohit",
      lastName: "chaudhary",
      email: "crohit313@gmail.com",
      status: "active",
      phoneNumber: "7833885751"
    };
  });
  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should add contact", () => {
    component.submitOrUpdate = "Add";
    component.addContact();
    expect(contactServiceService.contactList.length).toBe(1);
  });

  it("should update contact", () => {
    component.submitOrUpdate = "Update";
    component.editIndex = 0;
    contactServiceService.contactList.push(contactServiceService.contactToEdit);
    component.contactToEdit.firstName = "Rooo";

    component.addContact();
    fixture.detectChanges();
    expect(contactServiceService.contactList.length).toBe(1);
  });

  it("should reset contact form", () => {
    component.resetContactForm();
    expect(component.contactFormData.form.value.firstName).toBe(undefined);
    expect(component.contactFormData.form.value.lastName).toBe(undefined);
    expect(component.contactFormData.form.value.status).toBe(undefined);
    expect(component.contactFormData.form.value.email).toBe(undefined);
  });

  it("should validate contact", () => {
    component.contactToEdit = {
      firstName: "Rohit",
      lastName: "chaudhary",
      email: "crohit313@gmail.com",
      status: "active",
      phoneNumber: "7833885751"
    };

    component.contactList = [
      {
        firstName: "Rohit",
        lastName: "chaudhary",
        email: "crohit313@gmail.com",
        status: "active",
        phoneNumber: "7833885751"
      }
    ];

    expect(component.validateContact(component.contactToEdit)).toBeFalsy();

    component.contactToEdit = {
      firstName: "Rohit",
      lastName: "chaudhary",
      email: "rohit@gmail.com",
      status: "active",
      phoneNumber: "7833885712"
    };
    expect(component.validateContact(component.contactToEdit)).toBeTruthy();
  });
});
