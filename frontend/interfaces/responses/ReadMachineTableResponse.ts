import { HealthyState } from '../HealthyState'
import { UseState } from '../UseState'

/* eslint-disable camelcase */
export interface ReadMachineTableResponse {
  machine_name: string
  device_id: number
  init_val: number
  part_name: string
  use_state: UseState
  part_healthy: HealthyState
  system_date: string
  mean_count: number
  mean_day: number
  used_count: number
  used_day: number
  part_healthy_val: number
}
