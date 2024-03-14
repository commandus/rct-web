import { Card } from "./card.model";
import { Package } from "./package.model";
import { Property } from "./property.model";
import { User } from "./user.model";

export class ChCardRequest {
    public user: User = new User;
    public operationSymbol = '';
    public value: Card = new Card;
    public properties: Property[] = [];
    public packages: Package[] = [];
    public package_id = 0;  // if 0, all
}
