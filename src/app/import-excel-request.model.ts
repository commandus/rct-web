import { ExcelFile } from "./excel-file.model";
import { User } from "./user.model";

export class ImportExcelRequest {
    public user: User = new User;
    public symbol = "";
    public prefix_box = 0; // first box, e.g. 219
    public number_in_filename = true;
    public file: ExcelFile[] = [];
}
