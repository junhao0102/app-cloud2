export interface GeneralResponse<T> {
  data?: T
  message: string
  state: boolean
}
