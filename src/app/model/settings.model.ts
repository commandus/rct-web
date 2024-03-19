import { ServiceSettings } from "./service-settings.model";
import { User } from "./user.model";
import { SymbolProperty } from "./symbol-property.model";

export class Settings {
    public user: User = new User;
    public service: ServiceSettings[] = [];
    public symbol_property: SymbolProperty[] = [];
}

