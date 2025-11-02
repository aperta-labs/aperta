import type { Formatter } from "../models/formatter";
import type { Sink } from "../models/sink";

export function log(
  handleOutput: (content: string) => void,
  level: Uppercase<string>,
  namespace: string,
  message: string,
  formatter: Formatter,
  sink?: Sink
) {
  const date = new Date();
  const result = {
    date,
    pid: process.pid,
    level,
    namespace,
    message,
  };
  sink?.(result);
  handleOutput(formatter(result));
}
