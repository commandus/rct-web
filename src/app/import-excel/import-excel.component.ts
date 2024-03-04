import { Component } from '@angular/core';
import { Symbol } from '../model/symbol.model';
import { Box } from '../model/box.model';
import { WebappService } from '../webapp.service';
import { OperationResponse } from '../model/operation-response.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-import-excel',
  templateUrl: './import-excel.component.html',
  styleUrls: ['./import-excel.component.css']
})
export class ImportExcelComponent {
  
  fileToUpload: File | null = null;
  symbol: Symbol = new Symbol;
  box: Box = new Box;
  numbersInFilename: boolean = true;

  public loadedFiles: OperationResponse[] = [];
  public importOperation = '+';

  constructor(
    public svc: WebappService, 
    private router: Router
  ) { 
    svc.load().subscribe(v=>{});
  }

  onParam(
    symbol: Symbol,
    box: Box,
    numbersInFilename: boolean
  ): void {
    this.symbol = symbol
    this.box = box;
    this.numbersInFilename = numbersInFilename;
  }

  // .target.files
  handleFileInput(files: any) {
    var self = this;
    const reader = new FileReader();
    reader.onloadend = function(evt: ProgressEvent<FileReader>) {
        if (evt.target?.readyState != 2)
          return;
        if (evt.target.error)
          return;
        if (typeof evt.target.result === 'string' || evt.target.result instanceof String) {
          self.svc.loadExcelFile(
            self.symbol.sym,
            self.box.box_id,
            self.numbersInFilename,
            self.importOperation,
            files.target.files.item(0).name,
            new String(evt.target.result).toString()
          ).subscribe(v => {
            v.description = files.target.files.item(0).name;
            self.loadedFiles.push(v);
          });
        }
    };
    reader.readAsBinaryString(files.target.files.item(0));
  }

  back() {
    this.router.navigateByUrl('');
  }

}
