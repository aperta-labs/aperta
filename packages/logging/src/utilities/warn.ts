import { base } from "./base";

export function warn(namespace: string, message: string) {
  base("WARN", namespace, message);
}
