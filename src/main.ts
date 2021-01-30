import {Parser} from "./parser";
import {q} from './query';
import {functions} from "./functions";

functions.forEach((fn) => {
    q.registerFn(fn.name, fn.fn, fn);
});

export {Parser, q};
