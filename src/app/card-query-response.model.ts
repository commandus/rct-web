import { CardResponse } from "./card-response.model";
import { OperationResponse } from "./operation-response.model";

export class CardQueryResponse {
    public rslt: OperationResponse = new OperationResponse;
    public cards: CardResponse = new CardResponse;
}
