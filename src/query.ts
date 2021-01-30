import {QueryFunctions} from "./functions/declaration";
import {QueryBase} from "./query_base";

export interface QueryExtended extends QueryBase, QueryFunctions {
}

export const q: QueryExtended = (new QueryBase()) as QueryExtended;
