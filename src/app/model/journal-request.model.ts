import { List } from "./list.model";
import { User } from "./user.model";

export class JournalRequest {
    public user: User = new User();          ///< user
    public list: List = new List();          ///< list
    public box_id = 0;                       ///< filter by box
    public card_id = 0;                      ///< filter by card
}
