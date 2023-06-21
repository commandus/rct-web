import { Component } from '@angular/core';
import { Symbol } from '../symbol.model';
import { Box } from '../box.model';
import { WebappService } from '../webapp.service';

@Component({
  selector: 'app-import-excel',
  templateUrl: './import-excel.component.html',
  styleUrls: ['./import-excel.component.css']
})
export class ImportExcelComponent {
  
  fileToUpload: File | null = null;

  constructor(public svc: WebappService) { 
  }

  onParam(
    symbol: Symbol,
    box: Box
  ): void {

  }

  // .target.files
  handleFileInput(files: any) {
    console.log(files.target.files.item(0));
    // this.fileToUpload = files.item(0);
  }

}
