import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

import { WebappService } from '../webapp.service';
import { CardNPropetiesPackages } from '../model/card-npropeties-packages.model';
import { ChCardRequest } from '../model/ch-card-request.model';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { RcrJsonService } from '../rcr-json.service';
import { GetItemRequest } from '../model/get-item-request.model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';
import { CardQueryRequest } from '../model/card-query-request.model';


@Component({
  selector: 'app-card-by-id-edit',
  templateUrl: './card-by-id-edit.component.html',
  styleUrls: ['./card-by-id-edit.component.css']
})
export class CardByIdEditComponent implements OnInit {
  value: CardNPropetiesPackages = new CardNPropetiesPackages; 
  @Output() changed = new EventEmitter<ChCardRequest>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private app: WebappService,
    private rcr: RcrJsonService,
    private dialog: MatDialog
  ) {
    
  }

  ngOnInit(): void {
    this.app.load().subscribe(v=>{
      this.route.paramMap.pipe(
        switchMap(params => {
            const r = new GetItemRequest;
            r.id = Number(params.get('id'));
            return this.rcr.getCard(r);
          }
      )
      ).subscribe(v => { 
        this.value = v;
      });
    });
  }

  onChanged(request: ChCardRequest) {
    if (request.operationSymbol == '-') {
      const d = new MatDialogConfig();
      d.autoFocus = true;
      d.disableClose = true;
      d.data = {
        title: 'Удалить карточку ',
        message: 'Удаленную запись невозможно восстановить',
        value: request.value.id + ' ' + request.value.name
      };
      const dialogRef = this.dialog.open(DialogConfirmComponent, d);
      dialogRef.afterClosed().subscribe(
          data => {
            if (data.yes) {
              this.rcr.chCard(request).subscribe(
                resp => {
                  if (resp && resp.code == 0) {
                  }
                },
                error => {
                  console.log('rm card fail');
                });    
            }
          }
      );
    } else {
      this.rcr.chCard(request).subscribe(
        resp => {
          if (resp && resp.code == 0) {
          }
        },
        error => {
          console.log('ch card fail');
        });    
    }

    this.router.navigateByUrl('/');
  }


  onModified(request: CardQueryRequest) {
    if (request.query == '')
      return;
    this.rcr.cardQuery(request).subscribe(
      resp => {
        if (resp && resp.rslt.code == 0) {
          // console.log('modified successfully');  
        }
      },
      error => {
        console.log('modify fail');
      }
    );    
    this.router.navigateByUrl('/');
  }

  onCancel() {
    this.router.navigateByUrl('/');
  }

}
