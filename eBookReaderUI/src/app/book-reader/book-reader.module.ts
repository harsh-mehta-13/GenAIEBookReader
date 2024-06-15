import { NgModule } from '@angular/core';
import { MaterialModule } from '../material.module';
import { BookReaderComponent } from './book-reader.component';

@NgModule({
  declarations: [BookReaderComponent],
  imports: [
    MaterialModule
  ]
})
export class BookReaderModule { }
