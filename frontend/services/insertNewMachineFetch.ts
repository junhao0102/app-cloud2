// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { baseUrl } from './baseUrl'
import { mockMode } from './mockMode'
import { APIs } from '~/interfaces/APIs'

const apiPath = '/insert/new_machine'
const mockData = mockMode()

export const insertNewMachineFetch: APIs['insertNewMachine'] = async (machineName, deviceId, initVal, remark) => {
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
      device_id: deviceId,
      init_val: initVal,
      remark
    })
  })

  if (responses.ok) {
    const body = await responses.json()
    if (body?.state === true) {
      return true
    }
  }

  return false
}
