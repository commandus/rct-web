import { List } from "./list.model";
import { User } from "./user.model";

export class CardQueryRequest {
    public user: User = new User;
    public query = "";
    public measure_symbol = "";
    public list: List = new List;
}
