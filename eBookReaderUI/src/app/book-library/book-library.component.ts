import { Component, OnInit } from '@angular/core';
import Epub, { Book } from 'epubjs';
import { BookDetails } from '../models/book';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-library',
  templateUrl: './book-library.component.html',
  styleUrl: './book-library.component.scss',
})
export class BookLibraryComponent implements OnInit {
  bookPath: string[] = [
    'mock/books/pg1513-images-3.epub',
    'mock/books/pg16-images-3.epub',
    'mock/books/pg132-images-3.epub',
    'mock/books/pg100-images-3.epub',
    'mock/books/pg1513-images-3.epub',
    'mock/books/pg2701-images-3.epub',
    'mock/books/pg67098-images-3.epub',
  ];
  imgUrl = '';
  bookData: BookDetails[] = [];

  constructor(private route: Router) {
    this.bookPath.forEach(async (path, index) => {
      this.addMetaData(path);
    });
  }

  ngOnInit(): void {
    setTimeout(() => {
      console.log(this.bookData);
      localStorage.setItem('bookData', JSON.stringify(this.bookData));
    }, 1000);
  }

  addMetaData(path: string): any {
    const book = Epub(path);
    book.loaded.metadata.then((meta) => {
      let data = {
        title: meta.title,
        creator: meta.creator,
        pubDate: meta.pubdate,
        path: path,
      };
      this.bookData.push(data);
    });
  }

  openBook(index: number) {
    console.log(this.bookData[index].path);
    this.route.navigate(['/book-reader', index]);
  }
}
