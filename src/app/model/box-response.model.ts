import { Box } from "./box.model";
import { OperationResponse } from "./operation-response.model";

export class BoxResponse {
    public rslt: OperationResponse = new OperationResponse;
    public box: Box[] = [];
}
