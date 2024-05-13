// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { baseUrl } from './baseUrl'
import { mockMode } from './mockMode'
import { APIs } from '~/interfaces/APIs'
import { GeneralResponse } from '~/interfaces/responses/GeneralResponse'
import { ReadMachineHealthyResponse } from '~/interfaces/responses/ReadMachineHealthyResponse'
import { MachineHealthy } from '~/interfaces/MachineHealthy'

const apiPath = '/read/machine_healthy'
const mockData = mockMode()

export const readMachineHealthyFetch: APIs['readMachineHealthy'] = async () => {
  const responses = await fetchData()
  const listMap = new Map<string, MachineHealthy>()

  if (responses.ok) {
    const body = await responses.json() as GeneralResponse<ReadMachineHealthyResponse>

    if (body?.state) {
      const payload = body.data as ReadMachineHealthyResponse ?? {}

      Object.entries(payload.machine_name).forEach(([key, machineName]) => {
        const mapKey = machineName
        const meta = {
          name: machineName,
          healthyState: payload.healthy_state[key]
        } as MachineHealthy

        listMap.set(mapKey, meta)
      })
    }
  }

  return listMap
}

async function fetchData () {
  if (mockData === true) {
    return Promise.resolve(mockResponse)
  }

  const url = `${baseUrl}${apiPath}`
  const responses = await fetch(url, {
    method: 'post'
  })
  return responses
}

const mockResponse = {
  ok: true,
  json: () => Promise.resolve({
    state: true,
    data: {
      machine_name: {
        0: 'TXT001'
      },
      healthy_state: {
        0: 'G'
      }
    },
    message: 'Read the results have been completed.'
  })
}
