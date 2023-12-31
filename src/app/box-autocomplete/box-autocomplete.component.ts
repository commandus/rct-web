import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatSelectionList } from '@angular/material/list';
import { WebappService } from '../webapp.service';
import { Box } from '../model/box.model';
import { MatSelectChange } from '@angular/material/select';
import { FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { BoxResponse } from '../model/box-response.model';


@Component({
  selector: 'app-box-autocomplete',
  templateUrl: './box-autocomplete.component.html',
  styleUrls: ['./box-autocomplete.component.css']
})
export class BoxAutocompleteComponent {
  @ViewChild('boxlist') boxlist: MatSelectionList | undefined;
  @Output() boxSelected = new EventEmitter<Box>();
  cntrl = new FormControl('');

  filteredOptions!: Observable<Box[]>;

  constructor(public svc: WebappService) { 
  }

  ngOnInit() {
    this.filteredOptions = this.cntrl.valueChanges.pipe(
      startWith(''),
      map(value => { 
        if (value) {
          const box = new Box;
          box.box_id = Box.string2box(value);
          box.name = value;
          box.uname = value;
          box.box_id_name = value;
          this.boxSelected.emit(box);
        }
        return this.filter(value || '');
      }
      )
    );
  }

  private filter(value: string): Box[] {
    return this.svc.boxes.box.filter(b => b.box_id_name.indexOf(value) == 0);
  } 

  public onSelectionChanged(event: MatSelectChange, box: Box) {
    this.boxSelected.emit(box);
  }

}
