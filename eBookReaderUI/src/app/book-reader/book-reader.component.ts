import { Component, OnInit, ViewChild } from '@angular/core';
import { Book, Contents, Rendition } from 'epubjs/types';
import { NavItem } from 'epubjs/types/navigation';
import Epub from 'epubjs';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute } from '@angular/router';

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
  @ViewChild('rightSidebar') rightSidebar!: MatSidenav;
  selectedWord: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    let bookPath = '';
    this.route.params.subscribe((params) => {
      console.log('Book ID:', params['id']);
      bookPath = JSON.parse(localStorage.getItem('bookData') || '[]')[
        params['id']
      ].path;
      console.log('Book Path:', bookPath);

      // this.book = Epub('mock/books/pg1513-images-3.epub');

      this.book = Epub(bookPath);
      // this.book.renderTo("viewer");
      this.book.loaded.metadata.then((meta) => {
        this.title = meta.title;
        // this.data.author = meta.creator;
        console.log(meta);
      });

      this.book.loaded.cover
        .then((coverUrl) => {
          console.log('Cover URL:', coverUrl);
        })
        .catch((error) => {
          console.error('Failed to load cover image:', error);
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
      this.getDoubledClickedWord();
    });
  }

  getDoubledClickedWord() {
    this.rendition.on('relocated', () => {
      let contentsArray: any = this.rendition.getContents();
      if (contentsArray && contentsArray.length > 0) {
        const doc = contentsArray[0].document;
        if (doc) {
          // Safely add the event listener
          doc.addEventListener('dblclick', () => {
            const selection = doc.getSelection();
            if (selection && selection.rangeCount > 0) {
              const word = selection.toString().trim();
              if (word) {
                console.log(`Double-clicked word: ${word}`);
                // Additional logic here
                this.selectedWord = word;
                this.toggleRightSidebar();
              }
            }
          });
        }
      } else {
        console.error('No contents found');
      }
      console.log(contentsArray);
    });
  }

  toggleRightSidebar() {
    this.rightSidebar.toggle();
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
