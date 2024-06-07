// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { baseUrl } from './baseUrl'
import { mockMode } from './mockMode'
import { APIs } from '~/interfaces/APIs'
import { GeneralResponse } from '~/interfaces/responses/GeneralResponse'
import { ReadMachineTableResponse } from '~/interfaces/responses/ReadMachineTableResponse'
import { MachineTable } from '~/interfaces/MachineTable'

const apiPath = '/read/machine_table'
const mockData = mockMode()

export const readMachineTableFetch: APIs['readMachineTable'] = async () => {
  const responses = await fetchData()
  const listMap = new Map<string, MachineTable>()

  if (responses.ok) {
    const body = await responses.json() as GeneralResponse<ReadMachineTableResponse[]>

    if (body?.state) {
      const data = body.data ?? []
      // const payload = data[0] ?? {} as ReadMachineListResponse

      // Object.entries(payload.machine_name).forEach(([key, machineName]) => {
      //   const partName = payload.part_name[key]
      //   const mapKey = `${machineName}-${partName}`
      //   const meta = {
      //     machineName,
      //     deviceId: payload.device_id[key],
      //     initVal: payload.init_val[key],
      //     partHealthy: payload.part_healthy[key],
      //     partName,
      //     useState: payload.use_state[key]
      //   } as MachineTable

      //   listMap.set(mapKey, meta)
      // })

      data.forEach((payload, index) => {
        const meta: MachineTable = {
          deviceId: payload.device_id,
          initVal: payload.init_val,
          machineName: payload.machine_name,
          partHealthy: payload.part_healthy,
          partName: payload.part_name,
          useState: payload.use_state,
          meanCount: payload.mean_count,
          meanDay: payload.mean_day,
          partHealthyVal: payload.part_healthy_val,
          systemDate: payload.system_date,
          usedCount: payload.used_count,
          usedDay: payload.used_day
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
        init_val: 100,
        part_name: '儲紗輪(第一段)',
        use_state: 'Y',
        part_healthy: 'G',
        system_date: '2023-03-07',
        mean_count: 0,
        mean_day: 100,
        used_count: 0,
        used_day: 0,
        part_healthy_val: 0
      },
      {
        machine_name: 'TXT001',
        device_id: 0,
        init_val: 100,
        part_name: '儲紗輪(第二段)',
        use_state: 'Y',
        part_healthy: 'G',
        system_date: '2023-03-07',
        mean_count: 0,
        mean_day: 100,
        used_count: 0,
        used_day: 0,
        part_healthy_val: 0
      },
      {
        machine_name: 'TXT001',
        device_id: 0,
        init_val: 100,
        part_name: '儲紗輪(第三段)',
        use_state: 'Y',
        part_healthy: 'G',
        system_date: '2023-03-07',
        mean_count: 0,
        mean_day: 100,
        used_count: 0,
        used_day: 0,
        part_healthy_val: 0
      },
      {
        machine_name: 'TXT001',
        device_id: 0,
        init_val: 100,
        part_name: '儲紗輪(第四段)',
        use_state: 'Y',
        part_healthy: 'G',
        system_date: '2023-03-07',
        mean_count: 0,
        mean_day: 100,
        used_count: 0,
        used_day: 0,
        part_healthy_val: 0
      },
      {
        machine_name: 'TXT001',
        device_id: 0,
        init_val: 100,
        part_name: '送紗皮帶(第一段)',
        use_state: 'Y',
        part_healthy: 'G',
        system_date: '2023-03-07',
        mean_count: 0,
        mean_day: 100,
        used_count: 0,
        used_day: 0,
        part_healthy_val: 0
      },
      {
        machine_name: 'TXT001',
        device_id: 0,
        init_val: 100,
        part_name: '送紗皮帶(第二段)',
        use_state: 'Y',
        part_healthy: 'G',
        system_date: '2023-03-07',
        mean_count: 0,
        mean_day: 100,
        used_count: 0,
        used_day: 0,
        part_healthy_val: 0
      },
      {
        machine_name: 'TXT001',
        device_id: 0,
        init_val: 100,
        part_name: '送紗皮帶(第三段)',
        use_state: 'Y',
        part_healthy: 'G',
        system_date: '2023-03-07',
        mean_count: 0,
        mean_day: 100,
        used_count: 0,
        used_day: 0,
        part_healthy_val: 0
      },
      {
        machine_name: 'TXT001',
        device_id: 0,
        init_val: 100,
        part_name: '送紗皮帶(第四段)',
        use_state: 'Y',
        part_healthy: 'G',
        system_date: '2023-03-07',
        mean_count: 0,
        mean_day: 100,
        used_count: 0,
        used_day: 0,
        part_healthy_val: 0
      },
      {
        machine_name: 'TXT001',
        device_id: 0,
        init_val: 100,
        part_name: '羅拉捲布皮帶',
        use_state: 'Y',
        part_healthy: 'G',
        system_date: '2023-03-07',
        mean_count: 0,
        mean_day: 100,
        used_count: 0,
        used_day: 0,
        part_healthy_val: 0
      },
      {
        machine_name: 'TXT001',
        device_id: 0,
        init_val: 100,
        part_name: '馬達皮帶',
        use_state: 'Y',
        part_healthy: 'G',
        system_date: '2023-03-07',
        mean_count: 0,
        mean_day: 100,
        used_count: 0,
        used_day: 0,
        part_healthy_val: 0
      },
      {
        machine_name: 'TXT001',
        device_id: 0,
        init_val: 100,
        part_name: '主機傳動皮帶',
        use_state: 'Y',
        part_healthy: 'G',
        system_date: '2023-03-07',
        mean_count: 0,
        mean_day: 100,
        used_count: 0,
        used_day: 0,
        part_healthy_val: 0
      },
      {
        machine_name: 'TXT001',
        device_id: 0,
        init_val: 100,
        part_name: '捲布齒輪',
        use_state: 'Y',
        part_healthy: 'G',
        system_date: '2023-03-07',
        mean_count: 0,
        mean_day: 100,
        used_count: 0,
        used_day: 0,
        part_healthy_val: 0
      }
    ],
    // data: [
    //   {
    //     machine_name: {
    //       0: 'test device',
    //       1: 'test device',
    //       2: 'test device',
    //       3: 'test device',
    //       4: 'test device',
    //       5: 'test device',
    //       6: 'test device',
    //       7: 'test device',
    //       8: 'test device',
    //       9: 'test device',
    //       10: 'test device',
    //       11: 'test device'
    //     },
    //     device_id: {
    //       0: 0,
    //       1: 0,
    //       2: 0,
    //       3: 0,
    //       4: 0,
    //       5: 0,
    //       6: 0,
    //       7: 0,
    //       8: 0,
    //       9: 0,
    //       10: 0,
    //       11: 0
    //     },
    //     init_val: {
    //       0: 10,
    //       1: 10,
    //       2: 10,
    //       3: 10,
    //       4: 10,
    //       5: 10,
    //       6: 10,
    //       7: 10,
    //       8: 10,
    //       9: 10,
    //       10: 10,
    //       11: 10
    //     },
    //     part_name: {
    //       0: '儲紗輪(第一段)',
    //       1: '儲紗輪(第二段)',
    //       2: '儲紗輪(第三段)',
    //       3: '儲紗輪(第四段)',
    //       4: '送紗皮帶(第一段)',
    //       5: '送紗皮帶(第二段)',
    //       6: '送紗皮帶(第三段)',
    //       7: '送紗皮帶(第四段)',
    //       8: '羅拉捲布皮帶',
    //       9: '馬達皮帶',
    //       10: '主機傳動皮帶',
    //       11: '捲布齒輪'
    //     },
    //     use_state: {
    //       0: 'Y',
    //       1: 'Y',
    //       2: 'Y',
    //       3: 'Y',
    //       4: 'Y',
    //       5: 'Y',
    //       6: 'Y',
    //       7: 'Y',
    //       8: 'Y',
    //       9: 'Y',
    //       10: 'Y',
    //       11: 'Y'
    //     },
    //     part_healthy: {
    //       0: 'G',
    //       1: 'G',
    //       2: 'G',
    //       3: 'G',
    //       4: 'G',
    //       5: 'G',
    //       6: 'G',
    //       7: 'G',
    //       8: 'G',
    //       9: 'G',
    //       10: 'G',
    //       11: 'G'
    //     }
    //   }
    // ],
    message: 'Finished reading data'
  })
}
