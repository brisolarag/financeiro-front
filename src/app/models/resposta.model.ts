export interface Resposta<T> {
  error: boolean,
  msg: string,
  data: T
}
