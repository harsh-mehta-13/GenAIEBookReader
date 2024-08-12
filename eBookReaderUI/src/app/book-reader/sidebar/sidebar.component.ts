import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Character, Place } from '../../models/book';
import { AppService } from '../../app.service';
import { ImageDialogComponent } from '../viewImage/view-image.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class sidebarComponent implements OnInit, OnChanges {
  @Input() selectedWord: string = '';

  wordCategory: string = '';
  showImg: boolean = false;
  content: string = '';
  imageUrl: string = '';
  selectedBookId: string = '';

  altCharImgLoc = 'assets/charimgbackup.jpeg';
  altPlaceImgLoc = 'assets/placeimgbackup.avif';

  characters: Character[] = [];
  places: Place[] = [];

  constructor(private service: AppService,public dialog: MatDialog) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedWord'] && changes['selectedWord'].currentValue) {
      this.selectedBookId = JSON.parse(
        localStorage.getItem('selectedBookId') || ''
      );
      if (this.selectedBookId) {
        this.service
          .getWordDef(this.selectedBookId, this.selectedWord)
          .subscribe((data) => {
            if (data && data.word_type === 'character') {
              this.wordCategory = 'Character';
              this.content = data.desc ?? 'Description not available';
              this.imageUrl = data.image_path ?? this.altCharImgLoc;
              this.showImg = true;
            } else if (data && data.word_type === 'location') {
              this.wordCategory = 'Location';
              this.content = data.desc ?? 'Description not available';
              this.imageUrl = data.image_path ?? this.altPlaceImgLoc;
              this.showImg = true;
            } else {
              this.wordCategory = 'Meaning';
              this.content = data.desc ?? 'Meaning not available';
              this.showImg = false;
              this.imageUrl = '';
            }
          });
      }
    }
  }

  addToVocab() {
    this.service
      .addWordInVocab(this.selectedWord, this.selectedBookId)
      .subscribe((data)=>{console.log(data)},(err)=>{console.log(err)});
  }

  openImage(){
    let dat = {};
    if(this.wordCategory === 'Character'){
      dat = { imageUrl: this.imageUrl ?? this.altCharImgLoc }
    }
    else if(this.wordCategory === 'Location'){
      dat = { imageUrl: this.imageUrl ?? this.altPlaceImgLoc }
    }

    this.dialog.open(ImageDialogComponent, {
      data: dat,
    });
  }
}
