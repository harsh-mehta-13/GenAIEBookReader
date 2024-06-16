import { NgModule } from '@angular/core';
import { MaterialModule } from '../material.module';
import { BookReaderComponent } from './book-reader.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [BookReaderComponent],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class BookReaderModule { }
