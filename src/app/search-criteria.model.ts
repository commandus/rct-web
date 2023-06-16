import { Card } from "./card.model";

export class SearchCriteria {
    public compareSign = "";                      ///< =- equal, >=- greatr or equal,..
    public card: Card = new Card;                 ///< e.g. 100
}
