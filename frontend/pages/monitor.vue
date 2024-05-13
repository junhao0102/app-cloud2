<template>
  <div class="px-6 py-1 flex flex-col gap-2">
    <div class="text-sm breadcrumbs">
      <ul>
        <li>機台資訊</li>
      </ul>
    </div>

    <div class="flex p-2 rounded-lg bg-base-200 justify-end gap-2">
      <div class="self-center">
        <span>裝置</span>
        <select v-model="currentMachineName" class="input">
          <option value="" disabled>
            ---請選擇---
          </option>
          <option v-for="item in allNames" :key="item">
            {{ item }}
          </option>
        </select>

        <button v-if="$fetchState.pending" class="btn">
          <i class="fa-solid fa-refresh fa-fw fa-spin" />
          載入中
        </button>

        <button v-else class="btn" @click="$fetch()">
          <i class="fa-solid fa-refresh fa-fw" />
          重新整理
        </button>
      </div>
    </div>

    <template v-if="currentMachineName !== ''">
      <div class="divider">
        查詢結果
      </div>

      <div v-if="!machineExist">
        裝置不存在
      </div>

      <template v-else>
        <div class="stats shadow bg-base-200 w-full stats-vertical sm:stats-horizontal">
          <div class="stat">
            <div class="stat-title">
              裝置名稱
            </div>
            <div class="stat-value">
              {{ currentMachineName }}
            </div>
          </div>

          <div class="stat">
            <div class="stat-figure text-error">
              <i class="fa-solid fa-fw fa-2xl" :class="[typeIcon[lowerHealth], type[lowerHealth]]" />
            </div>
            <div class="stat-title">
              健康狀態
            </div>
            <div class="stat-value" :class="type[lowerHealth]">
              {{ typeLabel[lowerHealth] }}
            </div>
            <div class="stat-desc">
              {{ typeDesc[lowerHealth] }}
            </div>
          </div>
        </div>

        <div class="bg-base-200 p-2 rounded overflow-hidden">
          <div class="w-full overflow-auto">
            <table class="table w-full">
              <!-- head -->
              <thead>
                <tr>
                  <th>零件名稱</th>
                  <th>經驗值</th>
                  <th>平均更換時間(天數)</th>
                  <th>平均更換時間(機台轉數)</th>
                  <th>更換後使用時間</th>
                  <th>健康狀況</th>
                  <th>狀態</th>
                  <th />
                </tr>
              </thead>
              <tbody v-if="currentMachine.length > 0">
                <monitor-part-item
                  v-for="(component, index) in currentMachine"
                  :key="index"
                  :meta="component"
                  :index="index"
                  class="hover"
                />
              </tbody>

              <tbody v-else>
                <tr>
                  <td colspan="7" class="text-center">
                    無資料
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </template>
    </template>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import MonitorPartItem from '~/components/MonitorPartItem.vue'
import { MachineTable } from '~/interfaces/MachineTable'

const sessionMachineNameKey = 'monitor-machine-name'

export default Vue.extend({
  name: 'DevicePage',

  components: { MonitorPartItem },

  data: () => {
    return {
      currentMachineName: '',

      type: {
        G: 'text-success',
        Y: 'text-warning',
        R: 'text-error'
      },

      typeIcon: {
        G: 'fa-heart-circle-check',
        Y: 'fa-heart-circle-exclamation',
        R: 'fa-heart-circle-xmark'
      },

      typeLabel: {
        G: '良好',
        Y: '警示',
        R: '已達壽命'
      },

      typeDesc: {
        G: '所有零件狀況良好',
        Y: '部分零件狀況已達八成平均壽命',
        R: '部分零件狀況已超過平均壽命'
      }
    }
  },

  async fetch () {
    await this.$store.dispatch('fetchMachineList')
    await this.$store.dispatch('fetchMachineTable')
  },

  computed: {
    allNames () {
      return this.$store.getters.allMachineNames
    },

    allTable (): MachineTable[] {
      return this.$store.state?.machineTable ?? []
    },

    machineExist () {
      const allNames = this.allNames as string[]
      return allNames.includes(this.currentMachineName)
    },

    currentMachine () {
      const allTable = this.allTable as MachineTable[]
      const result = allTable.filter((machineTable, _index) => {
        return machineTable.machineName === this.currentMachineName
      })

      return result
    },

    lowerHealth () {
      const currentMachine = this.currentMachine as MachineTable[]
      const assertIndex = ['R', 'Y']

      for (let index = 0; index < assertIndex.length; index++) {
        const element = assertIndex[index]
        if (currentMachine.findIndex(v => v.partHealthy === element) >= 0) {
          return assertIndex[index]
        }
      }

      return 'G'
    }
  },

  watch: {
    currentMachineName (newVal, oldVal) {
      if (newVal === this.$route.query?.machineName) {
        return
      }

      window.sessionStorage.setItem(sessionMachineNameKey, newVal)

      const routeName = this.$route.name ?? 'monitor'
      const payload = {
        name: routeName,
        query: {
          machineName: newVal
        }
      }

      if (oldVal === '') {
        this.$router.replace(payload)
        return
      }

      this.$router.push(payload)
    }
  },

  mounted () {
    if (this.$route.query?.machineName) {
      this.currentMachineName = this.$route.query.machineName.toString()
    } else {
      const sessionMachineName = window.sessionStorage.getItem(sessionMachineNameKey)
      if (sessionMachineName) {
        this.currentMachineName = sessionMachineName
      }
    }
  },

  methods: {
  }
})
</script>
