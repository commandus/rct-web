import { Card } from "./card.model";
import { Operation } from "./operation.model";
import { Package } from "./package.model";
import { User } from "./user.model";

export class Log {
    public id = 0;                               ///< identifier
    public dt = 0;                               ///< modification date & time
    public user = new User;                      ///< user name
    public package: Package = new Package;       ///< package
    public card: Card = new Card;                ///< card
    public operation: Operation = new Operation; ///< +, -, =
    public value = 0;                            ///< amount
}
