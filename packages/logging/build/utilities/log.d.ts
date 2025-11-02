import type { Formatter } from "../models/formatter";
import type { Sink } from "../models/sink";
export declare function log(handleOutput: (content: string) => void, level: string, namespace: string, message: string, formatter: Formatter, sink?: Sink): void | Promise<void>;
