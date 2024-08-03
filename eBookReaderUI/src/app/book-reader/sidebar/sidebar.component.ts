import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Character, Place } from '../../models/book';
import { AppService } from '../../app.service';
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

  characters: Character[] = [];
  places: Place[] = [];

  constructor(private service: AppService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedWord'] && changes['selectedWord'].currentValue) {
      this.selectedBookId = JSON.parse(
        localStorage.getItem('selectedBookId') || ''
      );
      if (this.selectedBookId) {
        let dat = JSON.parse(localStorage.getItem(this.selectedBookId) || '{}');
        if (dat) {
          this.characters = dat.characters;
          this.places = dat.locations;
        }
      }
      this.checkWord();
    }
  }

  checkWord() {
    let ele = this.checkIfCharacter() ?? this.checkIfPlace() ?? undefined;
    if (ele) {
      this.content = ele.description;
      this.imageUrl = ele.image_path;
      this.showImg = true;
    } else {
      // make api call to get meaning of the word
      this.service.getWordMeaning(this.selectedWord).subscribe((data) => {
        this.showImg = false;
        this.wordCategory = '';
        if (data) this.content = data;
        else this.content = 'Meaning not found';
      });
    }
  }

  checkIfCharacter() {
    let dat = this.characters.find((c) => c.name === this.selectedWord);
    if (dat) {
      this.wordCategory = 'Character';
      return dat;
    } else {
      return undefined;
    }
  }

  checkIfPlace() {
    let dat = this.places.find((c) => c.name === this.selectedWord);
    if (dat) {
      this.wordCategory = 'Location';
      return dat;
    } else {
      return undefined;
    }
  }

  addToVocab() {
    this.service.addWordInVocab(this.selectedWord, this.selectedBookId).subscribe();
  }
}
