import { Operation } from "./operation.model";
import { Package } from "./package.model";

export class JournalEntry {
    public id = 0;                               ///< identifier
    public dt = 0;                               ///< modification date & time
    public user = "";                            ///< user name
    public package: Package = new Package;       ///< user name
    public operation: Operation = new Operation; ///< user name
    public value = 0;                            ///< amount
}
