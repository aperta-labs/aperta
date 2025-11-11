import type { Formatter } from "../models/formatter";
import type { Sink } from "../models/sink";
export declare function log(handleOutput: (content: string) => void, level: Uppercase<string>, namespace: string, message: string, formatter: Formatter, extras?: object, sink?: Sink): void;
