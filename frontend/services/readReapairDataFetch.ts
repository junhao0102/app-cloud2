// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { baseUrl } from './baseUrl'
import { mockMode } from './mockMode'
import { APIs } from '~/interfaces/APIs'
import { GeneralResponse } from '~/interfaces/responses/GeneralResponse'
import { ReadRepairDataResponse } from '~/interfaces/responses/ReadRepairDataResponse'
import { Repair } from '~/interfaces/Repair'

const apiPath = '/read/repair_data'
const mockData = mockMode()

export const readReapairDataFetch: APIs['readReapairData'] = async () => {
  const responses = await fetchData()
  const listMap = new Map<string, Repair>()

  if (responses.ok) {
    const body = await responses.json() as GeneralResponse<ReadRepairDataResponse[]>

    if (body?.state) {
      const data = body.data ?? []
      data.forEach((payload, index) => {
        const meta: Repair = {
          machineName: payload.machine_name,
          partName: payload.part_name,
          date: payload.repair_date,
          man: payload.repair_man,
          director: payload.director,
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
        part_name: '儲紗輪(第一段)',
        repair_date: '2023-01-08',
        repair_man: 'yang',
        director: 'yang',
        remark: 'testing dict'
      },
      {
        machine_name: 'TXT001',
        part_name: '儲紗輪(第一段)',
        repair_date: '2023-01-18',
        repair_man: 'yang',
        director: 'yang',
        remark: 'testing dict'
      }
    ],
    message: 'Read repair data OK!'
  })
}
