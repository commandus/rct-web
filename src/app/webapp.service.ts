import { Injectable } from '@angular/core';
import { RcrJsonService } from './rcr-json.service';
import { DictionariesResponse } from './dictionaries-response.model';
import { DictionariesRequest } from './dictionaries-request.model';
import { Symbol } from './symbol.model';
import { BoxResponse } from './box-response.model';
import { Box } from './box.model';
import { BoxRequest } from './box-request.model';
import { map } from 'rxjs';
import { CardQueryRequest } from './card-query-request.model';
import { CardQueryResponse } from './card-query-response.model';

@Injectable({
  providedIn: 'root'
})
export class WebappService {
  private rcr: RcrJsonService;
  public dictionaries: DictionariesResponse = new DictionariesResponse;
  public boxes: BoxResponse = new BoxResponse;
  // selected symbol id
  public symbol: Symbol = new Symbol;
  // user query input value
  public query = "";
  // selected box
  public box: Box = new Box;
  // query result
  public cards: CardQueryResponse = new CardQueryResponse;

  public load() {
    this.loadDictionaries();
    this.loadBoxes();
  }

  public cardQuery(
    symbol: Symbol,
    box: Box,
    query: string
  ) {
    const r = new CardQueryRequest;
    if (query.indexOf('*') < 0)
      query += '*';
    r.measure_symbol = symbol.sym;
    if (box.box_id.length > 0)
      query += ' ' + Box.box2string(box.box_id);
    r.query = query;

    this.rcr.cardQuery(r).subscribe(v => { 
      this.cards = v;
    });
  }

  private loadDictionaries() {
    const r = new DictionariesRequest;
    this.rcr.getDictionaries(r).subscribe(v => { 
      this.symbol = new Symbol;
      this.symbol.id = 0;
      this.symbol.description = "Все";
      v.symbol.unshift(this.symbol);
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
      return v;
    }))
    .subscribe(v => { 
      this.boxes = v;
      const b = new Box;
      b.name = "Все";
      b.box_id_name = "Все";
      this.boxes.box.unshift(b);
    });
  }

  constructor(private arcr: RcrJsonService) { 
    this.rcr = arcr;
    this.load();
  }
}

