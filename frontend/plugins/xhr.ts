import { Plugin } from '@nuxt/types'
import { APIs } from '~/interfaces/APIs'
import { insertNewPartFetch } from '~/services/insertNewPartFetch'
import { readPartListFetch } from '~/services/readPartListFetch'
import { readReapairDataFetch } from '~/services/readReapairDataFetch'
import { insertNewMachineFetch } from '~/services/insertNewMachineFetch'
import { insertNewRepairFetch } from '~/services/insertNewRepairFetch'
import { readMachineListFetch } from '~/services/readMachineListFetch'
import { readMachineTableFetch } from '~/services/readMachineTableFetch'
import { readMachineHealthyFetch } from '~/services/readMachineHealthyFetch'
import { linkUseDeviceIdFetch } from '~/services/linkUseDeviceIdFetch'
import { deletePartFetch } from '~/services/deletePartFetch'
import { deleteMachineListFetch } from '~/services/deleteMachineListFetch'
import { deleteMachineTableFetch } from '~/services/deleteMachineTableFetch'
import { deleteRepairDataFetch } from '~/services/deleteRepairDataFetch'
import { updatePartFetch } from '~/services/updatePartFetch'
import { updateMachineTableFetch } from '~/services/updateMachineTableFetch'

const apiPlugin: Plugin = (_context, inject) => {
  const apis: APIs = {
    // insert
    insertNewMachine: insertNewMachineFetch,
    insertNewPart: insertNewPartFetch,
    insertNewRepair: insertNewRepairFetch,

    // read
    readMachineList: readMachineListFetch,
    readMachineTable: readMachineTableFetch,
    readPartList: readPartListFetch,
    readMachineHealthy: readMachineHealthyFetch,
    readReapairData: readReapairDataFetch,
    linkUseDeviceId: linkUseDeviceIdFetch,

    // update
    updatePart: updatePartFetch,
    updateMachineTable: updateMachineTableFetch,

    // delete
    deletePart: deletePartFetch,
    deleteMachineList: deleteMachineListFetch,
    deleteMachineTable: deleteMachineTableFetch,
    deleteRepairData: deleteRepairDataFetch
  }

  inject('api', apis)
}

export default apiPlugin
