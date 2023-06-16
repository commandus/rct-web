import { Operation } from "./operation.model";
import { PropertyType } from "./property-type.model";
import { Symbol } from "./symbol.model";

export class DictionariesResponse {
    public operation: Operation[] = [];
    public symbol: Symbol[] = [];
    public property_type: PropertyType[] = [];
}
