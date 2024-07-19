import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Character, Place } from '../../models/book';
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

  characters: Character[] = [];
  places: Place[] = [];

  ngOnInit(): void {
    this.characters = JSON.parse(localStorage.getItem('characters') || '[]');
    this.places = JSON.parse(localStorage.getItem('places') || '[]');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedWord'] && changes['selectedWord'].currentValue) {
      this.checkWord();
    }
  }

  checkWord() {
    let ele = this.checkIfCharacter()
      ? this.checkIfCharacter()
      : this.checkIfPlace()
      ? this.checkIfPlace()
      : undefined;
    if (ele) {
      this.content = ele.description;
      this.imageUrl = ele.imgUrl;
      this.showImg = true;
    } else {
      // make api call to get meaning of the word
      this.wordCategory = '';
      this.showImg = false;
      this.content = 'word meaning to be added';
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
    console.log('Add to vocab');
  }
}
