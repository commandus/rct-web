import { User } from "./user.model";

export class LoginRequest {
    public user: User = new User;                          ///< user credentials
}
