import { UseState } from '../UseState'

/* eslint-disable camelcase */
export interface ReadPartListResponseLegacy {
  id: {
    [key: string]: number
  }
  part_name: {
    [key: string]: string
  }
  use_state: {
    [key: string]: UseState
  }
  remark: {
    [key: string]: string
  }
}
