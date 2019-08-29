import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AddContactComponent } from "./add-contact/add-contact.component";
import { ContactListComponent } from "./contact-list/contact-list.component";
import { HeaderComponent } from "./header/header.component";
import { Routes, RouterModule } from "@angular/router";
import { ContactFilterPipe } from "./contact-list/contact-filter";

@NgModule({
  declarations: [
    AppComponent,
    AddContactComponent,
    ContactListComponent,
    HeaderComponent,
    ContactFilterPipe
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
