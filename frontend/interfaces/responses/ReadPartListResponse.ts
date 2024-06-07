import { UseState } from '../UseState'

/* eslint-disable camelcase */
export interface ReadPartListResponse {
  id: number
  part_name: string
  use_state: UseState
  remark: string
}
