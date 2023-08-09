import { Operation } from "./operation.model";
import { Package } from "./package.model";
import { User } from "./user.model";

export class Log {
    public id = 0;                               ///< identifier
    public dt = 0;                               ///< modification date & time
    public user = new User;                      ///< user name
    public package: Package = new Package;       ///< user name
    public operation: Operation = new Operation; ///< user name
    public value = 0;                            ///< amount
}
