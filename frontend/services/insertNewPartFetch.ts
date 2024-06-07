// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { baseUrl } from './baseUrl'
import { mockMode } from './mockMode'
import { APIs } from '~/interfaces/APIs'
import { GeneralResponse } from '~/interfaces/responses/GeneralResponse'

const apiPath = '/insert/new_part'
const mockData = mockMode()

export const insertNewPartFetch: APIs['insertNewPart'] = async (partId, partName, remark, useState) => {
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
      id: partId,
      part_name: partName,
      use_state: useState,
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
