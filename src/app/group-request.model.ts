import { Group } from "./group.model";
import { User } from "./user.model";

export class GroupRequest {
    public user: User = new User;
    public operationSymbol = "="; // +, -, =
    public value: Group = new Group;
}
