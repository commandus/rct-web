import { User } from "./user.model";

export class LoginResponse {
    public user: User = new User;                          ///< returns token
    public success = true;
    public version = 0;                     ///< service version
    public version_name = "";                ///< service version name
}
