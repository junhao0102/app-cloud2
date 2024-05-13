// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { baseUrl } from './baseUrl'
import { mockMode } from './mockMode'
import { APIs } from '~/interfaces/APIs'
import { GeneralResponse } from '~/interfaces/responses/GeneralResponse'
import { LinkUseDeviceIdResponse } from '~/interfaces/responses/LinkUseDeviceIdResponse'
import { LinkDevice } from '~/interfaces/LinkDevice'

const apiPath = '/link/use_device_id'
const mockData = mockMode()

export const linkUseDeviceIdFetch: APIs['linkUseDeviceId'] = async () => {
  const responses = await fetchData()
  const partMap = new Map<string, LinkDevice>()

  if (responses.ok) {
    const body = await responses.json() as GeneralResponse<LinkUseDeviceIdResponse[]>

    if (body?.state) {
      // TODO: 正常資料結構
      // const data = body.data ?? []

      // TODO: 暫時使用，等待API修復格式
      const data = (body.data?.[0] ?? []) as LinkUseDeviceIdResponse[]

      data.forEach((payload, _index) => {
        const meta: LinkDevice = {
          aliasId: payload.aliasid,
          comment: payload.comment,
          createAt: payload.createat,
          deviceId: payload.device_id,
          enabled: payload.enabled === 1,
          machineId: payload.machineid,
          name: payload.name,
          serverId: payload.serverid,
          updateAt: payload.updateat
        }

        partMap.set(meta.deviceId.toString(), meta)
      })
    }
  }

  return partMap
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
        device_id: 1,
        serverid: 10,
        machineid: 10,
        enabled: 1,
        name: 'test',
        aliasid: 't1',
        comment: '123',
        createdat: '2023-02-07',
        updateat: '2023-03-07'
      },
      {
        device_id: 2,
        serverid: 11,
        machineid: 11,
        enabled: 1,
        name: 'test2',
        aliasid: 't2',
        comment: '456',
        createdat: '2023-02-08',
        updateat: '2023-03-07'
      }

    ],
    message: 'Finished reading data'
  })
}
