import { NgModule } from '@angular/core';
import { HomePageComponent } from './home-page.component';
import { MaterialModule } from '../material.module';

@NgModule({
  declarations: [HomePageComponent],
  imports: [
    MaterialModule 
  ]
})
export class HomePageModule { }
