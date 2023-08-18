import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

import { WebappService } from '../webapp.service';
import { CardNPropetiesPackages } from '../model/card-npropeties-packages.model';
import { ChCardRequest } from '../model/ch-card-request.model';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { RcrJsonService } from '../rcr-json.service';
import { GetItemRequest } from '../model/get-item-request.model';


@Component({
  selector: 'app-card-by-id-edit',
  templateUrl: './card-by-id-edit.component.html',
  styleUrls: ['./card-by-id-edit.component.css']
})
export class CardByIdEditComponent implements OnInit {
  value: CardNPropetiesPackages = new CardNPropetiesPackages; 

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private app: WebappService,
    private svc: RcrJsonService
  ) {
    
  }

  ngOnInit(): void {
    this.app.load().subscribe(v=>{
      this.route.paramMap.pipe(
        switchMap(params => {
            const r = new GetItemRequest;
            r.id = Number(params.get('id'));
            return this.svc.getCard(r);
          }
      )
      ).subscribe(v => { 
        this.value = v;
      });
    });
  }

  cancel(): void {
    this.router.navigateByUrl('/');
  }

  save(): void {
    this.router.navigateByUrl('/');
  }

  onChanged(value: ChCardRequest) {
    this.save();
  }

  onCancel() {
    this.cancel();
  }

}

