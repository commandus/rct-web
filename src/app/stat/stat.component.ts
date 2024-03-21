import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CardQueryRequest } from '../model/card-query-request.model';
import { RcrJsonService } from '../rcr-json.service';

@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.css']
})
export class StatComponent implements OnInit {
  public formGroup: FormGroup = new FormGroup({});
  public progress = false;
  public count = 0;
  public sum = 0;

  message = '';
  success: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private svc: RcrJsonService
  ) {
    this.success = true;
  }

  ngOnInit(): void {
    this.initForm();
    this.refresh();
  }

  private initForm() {
    this.formGroup = this.formBuilder.group({
      count: [0, []],
      sum: [0, []]
    });
   }

  cancel(): void {
    this.router.navigateByUrl('/');
  }

  refresh(): void {
    const r = new CardQueryRequest();
    r.query = "* sum";
    this.svc.cardQuery(r)
    .subscribe(
      value => {
        this.count = value.rslt.count;
        this.sum = value.rslt.sum;
      });
  }

}
