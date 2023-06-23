import { PropertyRequest } from "./property-request.model";
import { User } from "./user.model";

export class CardRequest {
    user: User = new User;
    // what to do
    operation_symbol = "";
    // search criterias
    id = 0;  // usually I dont know id, but..
    symbol_name = "";
    name = "";
    nominal = 0;
    properties: PropertyRequest[] = [];
    // in which box
    box = 0;
    // quantity
    qty = 0;
}
