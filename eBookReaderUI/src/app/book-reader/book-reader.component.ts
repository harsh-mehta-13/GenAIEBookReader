import { Component, OnInit, ViewChild } from '@angular/core';
import { Book, Contents, Rendition } from 'epubjs/types';
import { NavItem } from 'epubjs/types/navigation';
import Epub from 'epubjs';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { BookDetails } from '../models/book';
import { AppService } from '../app.service';

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
  isChatBotOpen: boolean = false;
  isPlacesBoxOpen: boolean = false;
  isCharsBoxOpen: boolean = false;
  bookData: BookDetails[] = [];
  selectedBookData: BookDetails | undefined;

  constructor(private route: ActivatedRoute, private router: Router, private service: AppService) {}

  ngOnInit() {
    this.bookData = JSON.parse(localStorage.getItem('bookData') || '[]');

    this.route.params.subscribe((params) => {
      let b_id = Number(params['id']);

      this.selectedBookData =
        this.bookData.find(
          (book: BookDetails) => book['b_id'] === b_id
        );
      
        if(this.selectedBookData){
      if (this.loadBook(this.selectedBookData.path)) {
        this.storeChapter();

        this.service.getBookCnL(b_id).subscribe((data) =>{
          console.log(data);
          localStorage.setItem(b_id.toString(), JSON.stringify({characters: data.characters ,locations: data.locations}));
        } );

        this.renderBook();
        this.loadAndGenerateLocations();
        this.getCurrentCompletionPercentage();
        this.getDoubledClickedWord();
      }
      else {
        console.error('Book not found');
      }
    }
    });
  }

  loadBook(bookPath: string): boolean {
    if (!bookPath) {
      console.error('Book path is not provided');
      return false;
    } else {
      this.book = Epub(bookPath);
      this.book.loaded.metadata.then((meta) => {
        this.title = meta.title;
      });
      return true;
    }
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

  toggleChatBot() {
    this.isChatBotOpen = !this.isChatBotOpen;
  }
  togglePlacesBox() {
    this.isPlacesBoxOpen = !this.isPlacesBoxOpen;
    if (this.isCharsBoxOpen) {
      this.isCharsBoxOpen = false;
    }
  }
  toggleCharsBox() {
    this.isCharsBoxOpen = !this.isCharsBoxOpen;
    if (this.isPlacesBoxOpen) {
      this.isPlacesBoxOpen = false;
    }
  }
  goToLibrary() {
    this.router.navigate(['/book-library']);
  }
}
