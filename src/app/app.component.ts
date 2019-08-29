import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ContactServiceService } from "./contact-service.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "Contact-List";
  notificationType = "";
  notificationMessage: any;
  constructor(
    private router: Router,
    private contactServiceService: ContactServiceService
  ) {}

  ngOnInit() {
    if (localStorage.getItem("contactListSaved")) {
      this.contactServiceService.contactList = JSON.parse(
        localStorage.getItem("contactListSaved")
      );
    }

    this.contactServiceService.currentNotification.subscribe(value => {
      this.notificationType = value.notificationType;
      this.notificationMessage = value.notificationMessage;
      setTimeout(() => {
        this.notificationType = "";
      }, 5000);
    });
    this.router.navigateByUrl("/add-contact");
  }
}
