import { User } from "./user.model";

export class ExportExcelRequest {
    public user: User = new User;
    public query = "";
    public symbol_name = "";
    public mime_type = "";
}
