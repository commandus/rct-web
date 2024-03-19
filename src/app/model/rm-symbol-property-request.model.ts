import { SymbolProperty } from "./symbol-property.model";
import { User } from "./user.model";

export class RmSymbolPropertyRequest {
    public user = new User;
    public symbol_property = new SymbolProperty;
}
