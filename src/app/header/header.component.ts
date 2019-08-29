import { Component, OnInit } from "@angular/core";
import { ContactServiceService } from "../contact-service.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  addOrEdit = "Add Contact";
  constructor(private contactServiceService: ContactServiceService) {}

  ngOnInit() {
    this.contactServiceService.currentAddOrEdit.subscribe(value => {
      this.addOrEdit = value;
    });
  }
}
