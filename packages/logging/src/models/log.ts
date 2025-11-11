export interface Log {
  namespace: string;
  pid: number;
  date: Date;
  message: string;
  level: string;
  extras?: object;
}
