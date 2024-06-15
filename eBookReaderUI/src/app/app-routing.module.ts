import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { Routes } from "@angular/router";
import { HomePageComponent } from "./home-page/home-page.component";
import { BookReaderComponent } from "./book-reader/book-reader.component";

export const routes: Routes = [
    { path: '', component: HomePageComponent },
    {path: 'home', redirectTo: ''},
    { path: 'book-reader', component: BookReaderComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }