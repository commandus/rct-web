import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Box } from '../model/box.model';
import { BoxTableComponent } from '../box-table/box-table.component';

@Component({
  selector: 'app-box-dashboard',
  templateUrl: './box-dashboard.component.html',
  styleUrls: ['./box-dashboard.component.css']
})
export class BoxDashboardComponent {
  @ViewChild(BoxTableComponent) boxTable!: BoxTableComponent;
  public box = new Box;

  constructor(
    private router: Router
  ) { 
  }

  public back() : void {
    this.router.navigateByUrl('');
  }

  public onFilterBox(box: Box) : void {
    this.box = box;
    const b = BigInt.asUintN(64, BigInt(box.box_id));
    this.boxTable.reload(b);
  }
}
