import { NgModule } from '@angular/core';
import { MaterialModule } from '../material.module';
import { BookReaderComponent } from './book-reader.component';
import { CommonModule } from '@angular/common';
import { sidebarComponent } from './sidebar/sidebar.component';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { PlacesComponent } from './places/places.component';

const routes: Routes = [{ path: '', component: BookReaderComponent }];

@NgModule({
  declarations: [BookReaderComponent, sidebarComponent, ChatbotComponent, PlacesComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    RouterModule.forChild(routes),
  ],
})
export class BookReaderModule {}
