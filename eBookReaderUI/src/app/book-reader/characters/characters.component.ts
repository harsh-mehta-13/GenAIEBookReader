import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
  } from '@angular/core';
  import { AppService } from '../../app.service';
  import { Character, Place } from '../../models/book';
  
  @Component({
    selector: 'app-chars',
    templateUrl: './characters.component.html',
    styleUrls: ['./characters.component.scss'],
  })
  export class CharactersComponent implements OnChanges {
    @Input() charsData: Character[] = [];
    logImagePath(imagePath: string) {
      console.log(imagePath);
    }
  
    constructor(private service: AppService) {}
  
    ngOnChanges(changes: SimpleChanges): void {
      
      if (changes['charsData'] && changes['charsData'].currentValue) {
          this.charsData = changes['charsData'].currentValue;
          console.log("herreee",this.charsData);
      }
    }
  }
  