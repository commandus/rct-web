import { SymbolProperty } from "./symbol-property.model";
import { User } from "./user.model";

export class SymbolPropertyRequest {
    public user = new User;
    public symbol_property = new SymbolProperty;
}
