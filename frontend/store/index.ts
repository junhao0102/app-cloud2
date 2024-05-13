import { set as VueSet } from 'vue'
// eslint-disable-next-line import/named
import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { LinkDevice } from '~/interfaces/LinkDevice'
import { Machine } from '~/interfaces/Machine'
import { MachineHealthy } from '~/interfaces/MachineHealthy'
import { MachineTable } from '~/interfaces/MachineTable'
import { Part } from '~/interfaces/Part'
import { Repair } from '~/interfaces/Repair'

export const state = () => ({
  machineList: [] as Machine[],
  machineTable: [] as MachineTable[],
  machineHealthy: [] as MachineHealthy[],
  partList: [] as Part[],
  repairData: [] as Repair[],
  linkDevices: [] as LinkDevice[]
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  allMachineNames: state => state.machineList.reduce((p, c) => {
    p.push(c.name)
    return p
  }, [] as string[]),

  allPartNames: state => state.partList.reduce((p, c) => {
    p.push(c.name)
    return p
  }, [] as string[])
}

export const mutations: MutationTree<RootState> = {
  UPDATE_PART_LIST (state, payload: Part[]) {
    VueSet(state, 'partList', payload)
  },

  UPDATE_MACHINE_LIST (state, payload: Machine[]) {
    VueSet(state, 'machineList', payload)
  },

  UPDATE_MACHINE_TABLE (state, payload: MachineTable[]) {
    VueSet(state, 'machineTable', payload)
  },

  UPDATE_MACHINE_HEALTHY (state, payload: MachineHealthy[]) {
    VueSet(state, 'machineHealthy', payload)
  },

  UPDATE_REPAIR_DATA (state, payload: Repair[]) {
    VueSet(state, 'repairData', payload)
  },

  UPDATE_LINK_DEVICES (state, payload: Repair[]) {
    VueSet(state, 'linkDevices', payload)
  }
}

export const actions: ActionTree<RootState, RootState> = {
  async fetchPartList ({ commit }) {
    const result = await this.$api.readPartList()
    const items = Array.from(result.values())
    commit('UPDATE_PART_LIST', items ?? [])
  },

  async fetchMachineList ({ commit }) {
    const result = await this.$api.readMachineList()
    const items = Array.from(result.values())
    commit('UPDATE_MACHINE_LIST', items ?? [])
  },

  async fetchMachineTable ({ commit }) {
    const result = await this.$api.readMachineTable()
    const items = Array.from(result.values())
    commit('UPDATE_MACHINE_TABLE', items ?? [])
  },

  async fetchMachineHealthy ({ commit }) {
    const result = await this.$api.readMachineHealthy()
    const items = Array.from(result.values())
    commit('UPDATE_MACHINE_HEALTHY', items ?? [])
  },

  async fetchRepairData ({ commit }) {
    const result = await this.$api.readReapairData()
    const items = Array.from(result.values())
    commit('UPDATE_REPAIR_DATA', items ?? [])
  },

  async fetchLinkDevices ({ commit }) {
    const result = await this.$api.linkUseDeviceId()
    const items = Array.from(result.values())
    commit('UPDATE_LINK_DEVICES', items ?? [])
  }
}
