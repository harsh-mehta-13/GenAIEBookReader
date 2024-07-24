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
      bookPath = JSON.parse(localStorage.getItem('bookData') || '[]')[
        params['id']
      ].path;

      this.book = Epub(bookPath);
      this.book.loaded.metadata.then((meta) => {
        this.title = meta.title;
      });

      this.storeChapter();
      this.renderBook();
      this.loadAndGenerateLocations();
      this.getCurrentCompletionPercentage();

      this.getDoubledClickedWord();
    });
  }

  storeChapter() {
    this.book.loaded.navigation.then((nav) => {
      console.log(nav);
      this.chapters = nav.toc;
    });
  }

  renderBook() {
    this.rendition = this.book.renderTo('viewer', {
      width: '100%',
      height: '100%',
      spread: 'auto', // Adjust spread settings here
      minSpreadWidth: 900, // Example value, adjust based on your layout
    });
    this.rendition.display();
  }

  loadAndGenerateLocations() {
    this.book.ready.then(() => {
      this.book.locations.generate(1024).then((locations: any) => {
        console.log('Locations generated', locations);
      });
    });
  }

  getCurrentCompletionPercentage() {
    this.rendition.on('locationChanged', (loc: any) => {
      console.log(loc);
      if (this.book.locations) {
        // Get the percentage of the current location
        const currentPercentage =
          this.book.locations.percentageFromCfi(loc.start) * 100;
        console.log(
          `Current book completion: ${currentPercentage.toFixed(2)}%`
        );
      }
      this.getCurrentChapter(loc);
    });
  }

  getCurrentChapter(currentLocation: any) {
    if (currentLocation && currentLocation.start) {
      let currentSection = this.book.spine.get(currentLocation.start);
      if (currentSection) {
        console.log('Current Section:', currentSection);
        let currentChapter = this.chapters.find(
          (chapter) => chapter.href.split('#')[0] === currentSection.href
        );
        if (currentChapter) {
          console.log('Current Chapter:', currentChapter.label);
          return currentChapter;
        }
      }
    }
    console.log('Current chapter not found.');
    return null;
  }

  getDoubledClickedWord() {
    this.rendition.on('relocated', () => {
      let contentsArray: any = this.rendition.getContents();
      if (contentsArray && contentsArray.length > 0) {
        const doc = contentsArray[0].document;
        if (doc) {
          doc.addEventListener('dblclick', () => {
            const selection = doc.getSelection();
            if (selection && selection.rangeCount > 0) {
              const word = selection.toString().trim();
              if (word) {
                this.selectedWord = word;
                this.toggleRightSidebar();
              }
            }
          });
        }
      } else {
        console.error('No contents found');
      }
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
}
