// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { baseUrl } from './baseUrl'
import { mockMode } from './mockMode'
import { APIs } from '~/interfaces/APIs'
import { GeneralResponse } from '~/interfaces/responses/GeneralResponse'
import { ReadMachineListResponse } from '~/interfaces/responses/ReadMachineListResponse'
import { Machine } from '~/interfaces/Machine'

const apiPath = '/read/machine_list'
const mockData = mockMode()

export const readMachineListFetch: APIs['readMachineList'] = async () => {
  const responses = await fetchData()
  const listMap = new Map<string, Machine>()

  if (responses.ok) {
    const body = await responses.json() as GeneralResponse<ReadMachineListResponse[]>

    if (body?.state) {
      const data = body.data ?? []
      // const payload = data[0] ?? {} as ReadMachineListResponse

      // Object.entries(payload.machine_name).forEach(([key, machineName]) => {
      //   const mapKey = machineName
      //   const meta = {
      //     name: machineName,
      //     deviceId: payload.device_id[key],
      //     remark: payload.remark[key]
      //   } as Machine

      //   listMap.set(mapKey, meta)
      // })

      data.forEach((payload, index) => {
        const meta: Machine = {
          deviceId: payload.device_id,
          name: payload.machine_name,
          remark: payload.remark
        }

        listMap.set(index.toString(), meta)
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
    data: [
      {
        machine_name: 'TXT001',
        device_id: 0,
        remark: ''
      }
    ],
    // data: [
    //   {
    //     device_id: {
    //       0: 0
    //     },
    //     machine_name: {
    //       0: 'TXT001'
    //     },
    //     remark: {
    //       0: ''
    //     }
    //   }
    // ],
    message: 'Finished reading data'
  })
}
