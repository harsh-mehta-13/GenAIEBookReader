import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { AppService } from '../../app.service';
import { Place } from '../../models/book';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.scss'],
})
export class PlacesComponent implements OnChanges {
  @Input() placesData:Place[] = [];

  constructor(private service: AppService) {}

  ngOnChanges(changes: SimpleChanges): void {
    
    if (changes['placesData'] && changes['placesData'].currentValue) {
        this.placesData = changes['placesData'].currentValue;
        console.log("herreee",this.placesData);
    }
  }
}
