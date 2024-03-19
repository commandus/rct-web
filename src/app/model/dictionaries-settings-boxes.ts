import { BoxResponse } from "./box-response.model";
import { DictionariesResponse } from "./dictionaries-response.model";
import { Settings } from "./settings.model";

export class DictionariesSettingsBoxes {
    public settings = new Settings;
    public dictionaries = new DictionariesResponse;
    public boxes = new BoxResponse;
}

