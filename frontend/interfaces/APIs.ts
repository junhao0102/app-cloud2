import { LinkDevice } from './LinkDevice'
import { Machine } from './Machine'
import { MachineHealthy } from './MachineHealthy'
import { MachineTable } from './MachineTable'
import { Part } from './Part'
import { Repair } from './Repair'
import { UpdateTarget } from './UpdateTarget'
import { UseState } from './UseState'

export declare interface APIs {
  // insert
  insertNewPart(partId:number, partName: string, remark: string, useState: 'Y' | 'N'): Promise<boolean>
  insertNewMachine(machineName: string, deviceId: number, initVal: number, remark: string): Promise<boolean>
  insertNewRepair(machineName: string, partName: string, repairDate: string, repairMan: string, director: string, remark: string): Promise<boolean>

  // read
  readMachineTable(): Promise<Map<string, MachineTable>>
  readMachineList(): Promise<Map<string, Machine>>
  readPartList(): Promise<Map<string, Part>>
  readMachineHealthy(): Promise<Map<string, MachineHealthy>>
  readReapairData(): Promise<Map<string, Repair>>
  linkUseDeviceId(): Promise<Map<string, LinkDevice>>

  // update
  updatePart(partId:number, partName: string, remark: string): Promise<boolean>
  updateMachineTable(machineName: string, partName: string, initVal: number, useState: UseState, updateTarget: UpdateTarget): Promise<boolean>

  // delete
  deletePart(partName: string): any
  deleteMachineList(machineName: string): any
  deleteMachineTable(machineName: string, partName: string): any
  deleteRepairData(machineName: string, partName: string, repairDate: string, repairMan: string, director: string): any
}
