import { Card } from "./card.model";
import { Package } from "./package.model";
import { PropertyWithName } from "./property-with-name.model";

export class CardNPropetiesPackages {
    public card: Card = new Card;
    public properties: PropertyWithName[] = [];
    public packages: Package[] = [];
}
