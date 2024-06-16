import { Component, OnInit } from '@angular/core';
import { Book, Rendition } from 'epubjs/types';
import { NavItem } from 'epubjs/types/navigation';
import Epub from 'epubjs';

@Component({
  selector: 'app-book-reader',
  templateUrl: './book-reader.component.html',
  styleUrl: './book-reader.component.css'
})
export class BookReaderComponent implements OnInit {
  book!: Book;
  rendition!: Rendition
  title: string = "";
  navOpen: boolean = true;
  chapters!: NavItem[];

  constructor() {

  }

  ngOnInit() {
    this.book = Epub("mock/books/Amish Tripathi - Shiva's Trilogy 1 _ The Immortals of Meluha-Westland.epub");
    // this.book.renderTo("viewer");
    this.book.loaded.metadata.then((meta) => {
      this.title = meta.title;
      // this.data.author = meta.creator;
      console.log(meta);
    });
    this.storeChapter();

    this.rendition = this.book.renderTo('viewer', { flow: 'auto', width: '100%', height: '100%' });
    this.rendition.display();

  }

  prevPage() {
    this.rendition.prev();
  };

  nextPage() {
    this.rendition.next();
  };

  displayChapter(chapter: any) {
    this.rendition.display(chapter.href);
  };

  toggleNav() {
    this.navOpen = !this.navOpen;
  };

  storeChapter() {
    this.book.loaded.navigation.then((nav) => {
      this.chapters = nav.toc;
      console.log(this.chapters);
    });
  }

}
