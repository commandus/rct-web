import { User } from "./user.model";

export class UserRequest {
    public user: User = new User;
    public operationSymbol = "="; // +, -, =
    public value: User = new User;
}
