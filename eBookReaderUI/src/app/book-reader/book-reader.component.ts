import { Component, OnInit } from '@angular/core';
import { Book, Rendition } from 'epubjs/types';
import { NavItem } from 'epubjs/types/navigation';
import Epub from 'epubjs';

@Component({
  selector: 'app-book-reader',
  templateUrl: './book-reader.component.html',
  styleUrl: './book-reader.component.scss',
})
export class BookReaderComponent implements OnInit {
  book!: Book;
  rendition!: Rendition;
  title: string = '';
  chapters!: NavItem[];

  constructor() {}

  ngOnInit() {
    this.book = Epub('mock/books/pg1513-images-3.epub');
    // this.book.renderTo("viewer");
    this.book.loaded.metadata.then((meta) => {
      this.title = meta.title;
      // this.data.author = meta.creator;
      console.log(meta);
    });
    this.storeChapter();
    // this.book.
    this.rendition = this.book.renderTo('viewer', {
      width: '100%',
      height: '100%',
      spread: 'auto', // Adjust spread settings here
      minSpreadWidth: 900, // Example value, adjust based on your layout
    });
    this.rendition.display();
    this.rendition.on('locationChanged', (loc: any) => {
      console.log(loc);
    });
  }

  prevPage() {
    this.rendition.prev();
  }

  nextPage() {
    this.rendition.next();
  }

  displayChapter(chapter: any) {
    this.rendition.display(chapter.href);
  }

  storeChapter() {
    this.book.loaded.navigation.then((nav) => {
      console.log(nav);
      this.chapters = nav.toc;
    });
    this.book.ready.then((a) => {
      console.log(a);
    });
  }
}
