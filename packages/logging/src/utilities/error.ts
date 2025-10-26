import { base } from "./base";

export function error(namespace: string, message: string) {
  base("ERROR", namespace, message);
}
