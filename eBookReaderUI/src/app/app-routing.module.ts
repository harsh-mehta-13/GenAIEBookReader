import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { Routes } from "@angular/router";
import { BookReaderComponent } from "./book-reader/book-reader.component";
import { AppComponent } from "./app.component";
import { BookLibraryComponent } from "./book-library/book-library.component";
import { HomeComponent } from "./home/home.component";

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent},
  { path: 'book-reader', component: BookReaderComponent },
  { path: 'book-library', component: BookLibraryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }