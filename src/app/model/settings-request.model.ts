import { ServiceSettings } from "./service-settings.model";
import { User } from "./user.model";
import { SymbolProperty } from "./symbol-property.model";
import { Settings } from "./settings.model";

export class SettingsRequest {
    public user = new User;
    public settings = new Settings;
}
