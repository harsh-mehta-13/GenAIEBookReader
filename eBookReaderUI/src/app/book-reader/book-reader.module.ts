import { NgModule } from '@angular/core';
import { MaterialModule } from '../material.module';
import { BookReaderComponent } from './book-reader.component';
import { CommonModule } from '@angular/common';
import { sidebarComponent } from './sidebar/sidebar.component';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [BookReaderComponent, sidebarComponent, ChatbotComponent],
  imports: [CommonModule, MaterialModule, FormsModule],
})
export class BookReaderModule {}
