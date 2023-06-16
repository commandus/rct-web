import { Injectable } from '@angular/core';
import { RcrJsonService } from './rcr-json.service';
import { DictionariesResponse } from './dictionaries-response.model';
import { DictionariesRequest } from './dictionaries-request.model';
import { Symbol } from './symbol.model';
import { BoxResponse } from './box-response.model';
import { Box } from './box.model';
import { BoxRequest } from './box-request.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebappService {
  private rcr: RcrJsonService;
  public dictionaries: DictionariesResponse = new DictionariesResponse;
  public boxes: BoxResponse = new BoxResponse;
  // selected symbol id
  public symbolid = 0;
  // user query input value
  public query = "";
  // selected box
  public box: Box = new Box;

  public load() {
    this.loadDictionaries();
    this.loadBoxes();
  }

  private loadDictionaries() {
    const r = new DictionariesRequest;
    this.rcr.getDictionaries(r).subscribe(v => { 
      let s = new Symbol;
      s.id = 0;
      s.description = "Все";
      v.symbol.unshift(s);
      this.dictionaries = v;
    });
  }

  private loadBoxes() {
    const r = new BoxRequest;
    this.rcr.getBox(r)
    .pipe(map(v => {
      // add helper property
      v.box.forEach(b => {
        b.box_id_name = Box.box2string(b.box_id);
      });
      // add root
      let s = new Box;
      s.name = "Все";
      s.box_id_name = "Все";
      v.box.unshift(s);
      return v;
    }))
    .subscribe(v => { 
      this.boxes = v;
    });
  }

  constructor(private arcr: RcrJsonService) { 
    this.rcr = arcr;
    this.load();
  }
}

