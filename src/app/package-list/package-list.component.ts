import { Component } from '@angular/core';
import { WebappService } from '../webapp.service';

@Component({
  selector: 'app-package-list',
  templateUrl: './package-list.component.html',
  styleUrls: ['./package-list.component.css']
})
export class PackageListComponent {
  constructor(public svc: WebappService) { 
  }

}
