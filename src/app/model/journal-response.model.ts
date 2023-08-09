import { Log } from "./log";
import { OperationResponse } from "./operation-response.model";

export class JournalResponse {
    public rslt = new OperationResponse;          ///< count
    public log: Log[] = [];          ///< log
}
