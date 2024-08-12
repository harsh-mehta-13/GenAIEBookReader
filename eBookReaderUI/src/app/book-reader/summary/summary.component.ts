import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { AppService } from '../../app.service';
import { Place } from '../../models/book';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent implements OnInit {
  selectedBookId: string = '';
  totalSummary: string = '';
  showTotalSummaryUi: boolean= true;
  chapterSummary: string = '';
  lastReadChapter: string = '';

  constructor(private service: AppService) {}

  ngOnInit() {
    this.selectedBookId = JSON.parse(localStorage.getItem('selectedBookId') ?? '');
    console.log(this.selectedBookId);

    this.lastReadChapter = JSON.parse(localStorage.getItem('lastReadChapter') ?? '1');
    console.log(this.lastReadChapter);

    this.getTotalSummary();
    
    
  }

  getTotalSummary() {
    this.service.getTotalSummary(this.selectedBookId).subscribe((data) => {
        console.log(data);
        this.totalSummary = data.summary;
      });
  }

  getChapterSummary() {
    this.service.getChapterSummary(this.selectedBookId,this.lastReadChapter).subscribe((data) => {
        console.log(data);
        this.chapterSummary = data;
      });
  }

  showTotalSummary(){
    this.showTotalSummaryUi = true;
  }

  showCurrentChapterSummary(){
    this.getChapterSummary();
    this.showTotalSummaryUi = false;
  }
}
