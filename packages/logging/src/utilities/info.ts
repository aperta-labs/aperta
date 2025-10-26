import { base } from "./base";

export function info(namespace: string, message: string) {
  base("INFO", namespace, message);
}
