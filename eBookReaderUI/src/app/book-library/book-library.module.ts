import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookLibraryComponent } from './book-library.component';
import { MaterialModule } from '../material.module';

@NgModule({
  declarations: [BookLibraryComponent],
  imports: [CommonModule, MaterialModule],
})
export class BookLibraryModule {}
