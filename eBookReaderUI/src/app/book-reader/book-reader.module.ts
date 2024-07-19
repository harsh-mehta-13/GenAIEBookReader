import { NgModule } from '@angular/core';
import { MaterialModule } from '../material.module';
import { BookReaderComponent } from './book-reader.component';
import { CommonModule } from '@angular/common';
import { sidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [BookReaderComponent, sidebarComponent],
  imports: [CommonModule, MaterialModule],
})
export class BookReaderModule {}
