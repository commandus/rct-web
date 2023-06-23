import { Box } from "./box.model";
import { User } from "./user.model";

export class ChBoxRequest {
    public user: User = new User;
    public  operationSymbol = "";
    public value: Box = new Box;
}
