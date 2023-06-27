import { User } from "./user.model";

export class GetItemRequest {
    public user: User = new User;                   ///< 0..
    public id = 0;                                  ///< it's actually 64 bit number not 32 bit number
}
