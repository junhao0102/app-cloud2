import { HealthyState } from '../HealthyState'

/* eslint-disable camelcase */
export interface ReadMachineHealthyResponse {
  machine_name: {
    [key: string]: string
  }
  healthy_state: {
    [key: string]: HealthyState
  }
}
