// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { baseUrl } from './baseUrl'
import { mockMode } from './mockMode'
import { APIs } from '~/interfaces/APIs'
import { GeneralResponse } from '~/interfaces/responses/GeneralResponse'

const apiPath = '/update/update_m_table'
const mockData = mockMode()

export const updateMachineTableFetch: APIs['updateMachineTable'] = async (machineName, partName, initVal, useState, updateTarget) => {
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
      init_val: initVal,
      use_state: useState,
      update_target: updateTarget
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
