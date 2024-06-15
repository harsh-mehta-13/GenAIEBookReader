import { Component, OnInit } from '@angular/core';
import { Book, Rendition } from 'epubjs/types';
import Epub from 'epubjs';

@Component({
  selector: 'app-book-reader',
  templateUrl: './book-reader.component.html',
  styleUrl: './book-reader.component.css'
})
export class BookReaderComponent implements OnInit{
  book!: Book;
  data: any;
  rendition!: Rendition

  constructor() {
    
  }

  ngOnInit() {
    this.book = Epub("mock/books/Amish Tripathi - Shiva's Trilogy 1 _ The Immortals of Meluha-Westland.epub");
    // this.book.renderTo("viewer");
    this.book.loaded.metadata.then((meta) => {
      // this.data.title = meta.title;
      // this.data.author = meta.creator;
      console.log(meta);
    });

    this.book.loaded.navigation.then(navigation => {
      // this.data.chapters = navigation.toc;
      console.log(navigation);
      // this.data.currentChapter = this.data.chapters[4];
    });

    this.rendition = this.book.renderTo('viewer', { flow: 'auto', width: '100%', height: '100%' });
    this.rendition.display();
  }

}
