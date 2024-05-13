// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { baseUrl } from './baseUrl'
import { mockMode } from './mockMode'
import { APIs } from '~/interfaces/APIs'
import { GeneralResponse } from '~/interfaces/responses/GeneralResponse'

const apiPath = '/insert/new_repair'
const mockData = mockMode()

export const insertNewRepairFetch: APIs['insertNewRepair'] = async (machineName, partName, repairDate, repairMan, director, remark) => {
  const url = `${baseUrl}${apiPath}`

  if (mockData) {
    return new Promise(resolve => setTimeout(() => resolve(true), 1000))
  }

  const responses = await fetch(url, {
    method: 'post',
    headers: {
      Accpet: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      machine_name: machineName,
      part_name: partName,
      repair_date: repairDate,
      repair_man: repairMan,
      director,
      remark
    })
  })

  if (responses.ok) {
    const body = await responses.json() as GeneralResponse<any>
    if (body?.state === true) {
      return true
    }
  }

  return false
}
