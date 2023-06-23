import { GroupUser } from "./group-user.model";
import { User } from "./user.model";

export class GroupUserRequest {
    public user: User = new User;
    public operationSymbol = "="; // +, -, =
    public value: GroupUser = new GroupUser;
}
