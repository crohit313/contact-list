import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ContactListComponent } from "./contact-list.component";
import { RouterTestingModule } from "@angular/router/testing";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { ContactServiceService } from "../contact-service.service";
import { Router } from "@angular/router";
import { ContactFilterPipe } from "./contact-filter";

describe("ContactListComponent", () => {
  let component: ContactListComponent;
  let fixture: ComponentFixture<ContactListComponent>;
  let contactServiceService;
  let router;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContactListComponent, ContactFilterPipe],
      imports: [RouterTestingModule, BrowserModule, FormsModule],
      providers: [ContactServiceService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    contactServiceService = TestBed.get(ContactServiceService);
    router = TestBed.get(Router);
    contactServiceService.contactList = [
      {
        firstName: "Rohit",
        lastName: "chaudhary",
        email: "crohit313@gmail.com",
        status: "active",
        phoneNumber: "7833885751"
      },
      {
        firstName: "Rohit1",
        lastName: "chaudhary1",
        email: "crohit3132@gmail.com",
        status: "active",
        phoneNumber: "7833885752"
      }
    ];
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should get contact list from service", () => {
    component.ngOnInit();
    expect(component.contactList.length).toBe(2);
  });

  it("should clear filter", () => {
    component.clearFilter();
    expect(component.contactListModel.firstName).toBe(undefined);
    expect(component.contactListModel.lastName).toBe(undefined);
    expect(component.contactListModel.phoneNumber).toBe(undefined);
    expect(component.contactListModel.email).toBe(undefined);
  });

  it("should delete contact", () => {
    component.deleteContact(1);
    expect(contactServiceService.contactList.length).toBe(1);
  });
});
