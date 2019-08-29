import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AddContactComponent } from "./add-contact/add-contact.component";
import { ContactListComponent } from "./contact-list/contact-list.component";

const routes: Routes = [
  { path: "add-contact", component: AddContactComponent },
  { path: "contact-list", component: ContactListComponent },
  { path: "edit-contact", component: AddContactComponent },
  { path: "", redirectTo: "add-contact", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
