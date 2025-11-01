import { debug } from "./utilities/debug";
import { error } from "./utilities/error";
import { info } from "./utilities/info";
import { warn } from "./utilities/warn";
export declare const logger: {
    info: typeof info;
    error: typeof error;
    warn: typeof warn;
    debug: typeof debug;
};
