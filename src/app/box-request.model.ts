import { List } from "./list.model";
import { User } from "./user.model";

export class BoxRequest {
    public user: User = new User;
    public start = 0;
    public depth = 0;
    public list: List = new List;
}
