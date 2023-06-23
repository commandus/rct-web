import { PropertyType } from "./property-type.model";
import { User } from "./user.model";

export class ChPropertyTypeRequest {
    public user: User = new User;
    public operationSymbol = "";
    public value: PropertyType = new PropertyType;
}
