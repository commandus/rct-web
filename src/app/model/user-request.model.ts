import { User } from "./user.model";

export class UserRequest {
    public userL: User = new User;
    public operationSymbol = "="; // +, -, =
    public value: User = new User;
}
