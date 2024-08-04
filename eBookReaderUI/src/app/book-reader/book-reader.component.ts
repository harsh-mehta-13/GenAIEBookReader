import { Component, OnInit, ViewChild } from '@angular/core';
import { Book, Contents, Rendition } from 'epubjs/types';
import { NavItem } from 'epubjs/types/navigation';
import Epub from 'epubjs';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { BookDetails, Character, Place } from '../models/book';
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
  selectedBookData?: BookDetails;
  locationsData: Place[] = [];
  charsData: Character[] = [];
  isSummaryBoxOpen: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: AppService
  ) {}

  ngOnInit() {
    this.bookData = JSON.parse(localStorage.getItem('bookData') || '[]');

    this.route.params.subscribe((params) => {
      let b_id = Number(params['id']);

      this.selectedBookData = this.bookData.find(
        (book: BookDetails) => book['b_id'] === b_id
      );

      // setTimeout(()=>{if (temp) this.selectedBookData = temp;},100);

      if (this.selectedBookData) {
        if (this.loadBook(this.selectedBookData.path)) {
          this.storeChapter();

          this.service.getBookCnL(b_id).subscribe((data) => {
            if (data) {
              console.log(data);
              localStorage.setItem(b_id.toString(),JSON.stringify({characters: data.characters,locations: data.locations}));
              this.locationsData = data.locations;
              this.charsData = data.characters;              
            }
          });

          this.renderBook();
          this.loadAndGenerateLocations();
          this.getCurrentCompletionPercentage();
          this.getDoubledClickedWord();
          //   setTimeout(()=>{this.getDoubledClickedWord();},100)
        } else {
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
      console.log("This is the information: " + nav.toc);
      console.log("This is the information: " + this.chapters);
  
      // Log chapter names
      this.chapters.forEach((chapter) => {
        console.log("Chapter name: " + chapter.label);
      });
    });
  }

  renderBook() {
    this.rendition = this.book.renderTo('viewer', {
      width: '100%',
      height: '100%',
      spread: 'none', // Adjust spread settings here
      minSpreadWidth: 700, // Example value, adjust based on your layout
    });

    this.rendition.themes.register('custom', {
      'body, html': {
        'font-size': '18px', // Adjust the font size as needed
        'background-color': 'transparent!important', // Adjust the background color as needed
        'font-family': 'Roboto, sans-serif',
        'line-height':'1.7',
         
      },
      '.x-ebookmaker-cover': {
        'background-color': 'transparent!important'
      }
    });
    this.rendition.themes.select('custom');
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
        console.log('Total Chapters: ', this.chapters);
        let currentChapter = this.chapters.find(
          (chapter) => chapter.href.split('#')[0] === currentSection.href
        );
        if (currentChapter) {
          console.log('Current Chapter:', currentChapter.label);
          localStorage.setItem('lastReadChapter', JSON.stringify(currentChapter.label));
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

  closeIfOpenRightSidebar() {
    this.rightSidebar.opened ? this.rightSidebar.close() : null;
  }

  prevPage() {
    this.rendition.prev();
    this.getDoubledClickedWord();
    this.closeIfOpenRightSidebar();
  }

  nextPage() {
    this.rendition.next();
    this.getDoubledClickedWord();
    this.closeIfOpenRightSidebar();
  }

  displayChapter(chapter: any) {
    this.closeIfOpenRightSidebar();
    this.rendition.display(chapter.href);
  }

  toggleChatBot() {
    this.isChatBotOpen = !this.isChatBotOpen;
  }
  togglePlacesBox() {
    this.closeIfOpenRightSidebar();
    this.isPlacesBoxOpen = !this.isPlacesBoxOpen;
    this.isCharsBoxOpen = false;
    this.isSummaryBoxOpen = false;
  }
  toggleCharsBox() {
    this.closeIfOpenRightSidebar();
    this.isCharsBoxOpen = !this.isCharsBoxOpen;
    this.isPlacesBoxOpen = false;
    this.isSummaryBoxOpen = false;
    
  }
  goToLibrary() {
    this.closeIfOpenRightSidebar();
    this.router.navigate(['/book-library']);
  }

  toggleSummary(){
    this.closeIfOpenRightSidebar();
    this.isSummaryBoxOpen = !this.isSummaryBoxOpen;
    this.isPlacesBoxOpen = false;
    this.isCharsBoxOpen = false;
  }
}
