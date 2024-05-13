// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { baseUrl } from './baseUrl'
import { mockMode } from './mockMode'
import { APIs } from '~/interfaces/APIs'

const apiPath = '/del/machine_list_data'
const mockData = mockMode()

export const deleteMachineListFetch: APIs['deleteMachineList'] = async (machineName) => {
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
      machine_name: machineName
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
