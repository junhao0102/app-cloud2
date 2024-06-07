// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { baseUrl } from './baseUrl'
import { mockMode } from './mockMode'
import { APIs } from '~/interfaces/APIs'
import { Part } from '~/interfaces/Part'
import { ReadPartListResponse } from '~/interfaces/responses/ReadPartListResponse'
import { GeneralResponse } from '~/interfaces/responses/GeneralResponse'

const apiPath = '/read/part_list'
const mockData = mockMode()

export const readPartListFetch: APIs['readPartList'] = async () => {
  const responses = await fetchData()
  const listMap = new Map<string, Part>()

  if (responses.ok) {
    const body = await responses.json() as GeneralResponse<ReadPartListResponse[]>

    if (body?.state) {
      const data = body.data ?? []
      // const payload = data[0] ?? {} as ReadPartListResponse

      // Object.entries(payload.part_name).forEach(([key, partName]) => {
      //   const mapKey = partName
      //   const meta = {
      //     id: payload.id[key],
      //     name: partName,
      //     useState: payload.use_state[key],
      //     remark: payload.remark[key]
      //   }

      //   listMap.set(mapKey, meta)
      // })

      data.forEach((payload, index) => {
        const meta: Part = {
          id: payload.id,
          name: payload.part_name,
          remark: payload.remark,
          useState: payload.use_state
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
    method: 'get'
  })
  return responses
}

const mockResponse = {
  ok: true,
  json: () => Promise.resolve({
    state: true,
    data: [
      {
        id: 1,
        part_name: '儲紗輪(第一段)',
        use_state: 'Y',
        remark: '1234'
      },
      {
        id: 2,
        part_name: '儲紗輪(第二段)',
        use_state: 'Y',
        remark: ''
      },
      {
        id: 3,
        part_name: '儲紗輪(第三段)',
        use_state: 'Y',
        remark: ''
      },
      {
        id: 4,
        part_name: '儲紗輪(第四段)',
        use_state: 'Y',
        remark: ''
      },
      {
        id: 5,
        part_name: '送紗皮帶(第一段)',
        use_state: 'Y',
        remark: ''
      },
      {
        id: 6,
        part_name: '送紗皮帶(第二段)',
        use_state: 'Y',
        remark: ''
      },
      {
        id: 7,
        part_name: '送紗皮帶(第三段)',
        use_state: 'Y',
        remark: ''
      },
      {
        id: 8,
        part_name: '送紗皮帶(第四段)',
        use_state: 'Y',
        remark: ''
      },
      {
        id: 9,
        part_name: '羅拉捲布皮帶',
        use_state: 'Y',
        remark: ''
      },
      {
        id: 10,
        part_name: '馬達皮帶',
        use_state: 'Y',
        remark: ''
      },
      {
        id: 11,
        part_name: '主機傳動皮帶',
        use_state: 'Y',
        remark: ''
      },
      {
        id: 12,
        part_name: '捲布齒輪',
        use_state: 'Y',
        remark: ''
      }
    ],
    // data: [
    //   {
    //     id: {
    //       0: 1,
    //       1: 2,
    //       2: 3,
    //       3: 4,
    //       4: 5,
    //       5: 6,
    //       6: 7,
    //       7: 8,
    //       8: 9,
    //       9: 10,
    //       10: 11,
    //       11: 12
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
    //     remark: {
    //       0: '',
    //       1: '',
    //       2: '',
    //       3: '',
    //       4: '',
    //       5: '',
    //       6: '',
    //       7: '',
    //       8: '',
    //       9: '',
    //       10: '',
    //       11: ''
    //     }
    //   }
    // ],
    message: 'Imported data completed'
  })
}
