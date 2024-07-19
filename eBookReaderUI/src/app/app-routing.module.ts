import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { BookReaderComponent } from './book-reader/book-reader.component';
import { BookLibraryComponent } from './book-library/book-library.component';

export const routes: Routes = [
  { path: '', redirectTo: '/book-library', pathMatch: 'full' },
  { path: 'book-reader/:id', component: BookReaderComponent },
  { path: 'book-library', component: BookLibraryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
