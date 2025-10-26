import { base } from "./base";

export function debug(namespace: string, message: string) {
  base("DEBUG", namespace, message);
}
