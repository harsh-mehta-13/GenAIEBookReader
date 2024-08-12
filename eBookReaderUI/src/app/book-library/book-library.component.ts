import { Component, OnInit } from '@angular/core';
import Epub, { Book } from 'epubjs';
import { BookDetails, VocabData, Vocabulary } from '../models/book';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-book-library',
  templateUrl: './book-library.component.html',
  styleUrl: './book-library.component.scss',
})
export class BookLibraryComponent implements OnInit {
  bookData: BookDetails[] = [];
  showVocabPage: boolean = false;
  vocabData: Array<[string, Vocabulary[]]> = [];

  constructor(private route: Router, private service: AppService) {
  }

  ngOnInit(): void {
    this.service.getAllBooks().subscribe(
      (data) => {
        console.log(data);
        data.forEach((book: any) => {
          this.bookData.push({
            b_id: book.b_id,
            title: book.book_title,
            author: book.author,
            path: book.file_path.substring(book.file_path.indexOf('mock/')),
            cover_path: (book.cover_image_path &&  book.cover_image_path.length > 5 )?book.cover_image_path.substring(book.cover_image_path.indexOf('mock/')): null,
            last_read: book.last_read,
            summary: book.summary,
          });
        });
      },
      (error) => {
        console.error(error);
      }
    );

    setTimeout(() => {
      console.log(this.bookData);
      localStorage.setItem('bookData', JSON.stringify(this.bookData));
    }, 1000);
  }

  openBook(index: number) {
    console.log(this.bookData[index].path);
    localStorage.setItem('selectedBookId', this.bookData[index].b_id.toString());
    this.route.navigate(['/book-reader', this.bookData[index].b_id]);
  }

  showVocab(){
    this.showVocabPage = true;
    this.getVocab();
  }

  showLib(){
    this.showVocabPage = false;
  }

  getVocab() {
    this.service.getVocacabulary().subscribe((data) => {
      let vdat: VocabData = data;
      this.vocabData= Object.entries(vdat);
      console.log(this.vocabData);

    });
  }

}
