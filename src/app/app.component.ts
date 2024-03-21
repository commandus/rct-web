import { Component } from '@angular/core';
import { WebappService } from './webapp.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Компоненты';

  constructor(
    public svc: WebappService
  ) {
    svc.load().subscribe(v=>{
      console.log('RCR started');
    });
  }

}
