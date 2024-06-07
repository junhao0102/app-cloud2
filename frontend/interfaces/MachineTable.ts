import { HealthyState } from './HealthyState'
import { UseState } from './UseState'

export interface MachineTable {
  machineName: string
  deviceId: number
  initVal: number
  partName: string
  useState: UseState
  partHealthy: HealthyState
  systemDate: string
  meanCount: number
  meanDay: number
  usedCount: number
  usedDay: number
  partHealthyVal: number
}
