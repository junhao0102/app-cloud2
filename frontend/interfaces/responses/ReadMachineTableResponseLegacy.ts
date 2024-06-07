import { HealthyState } from '../HealthyState'
import { UseState } from '../UseState'

/* eslint-disable camelcase */
export interface ReadMachineTableResponseLegacy {
  machine_name: {
    [key: string]: string
  }
  device_id: {
    [key: string]: number
  }
  init_val: {
    [key: string]: number
  }
  part_name: {
    [key: string]: string
  }
  use_state: {
    [key: string]: UseState
  }
  part_healthy: {
    [key: string]: HealthyState
  }
}
