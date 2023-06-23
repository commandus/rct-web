import { ServiceSettings } from "./service-settings.model";
import { User } from "./user.model";

export class Settings {
    public user: User = new User;
    public service: ServiceSettings[] = [];
}

