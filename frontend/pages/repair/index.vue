<template>
  <div class="px-6 py-1 flex flex-col gap-2">
    <div class="text-sm breadcrumbs">
      <ul>
        <li>維修記錄</li>
      </ul>
    </div>

    <div class="flex p-2 rounded-lg bg-base-200 justify-end gap-2">
      <div class="self-center">
        <span>裝置</span>

        <select v-model="currentMachineName" class="input">
          <option value="" disabled>
            ---請選擇---
          </option>
          <option v-for="item in allMachineNames" :key="item" :value="item">
            {{ item }}
          </option>
        </select>

        <span>零件</span>
        <select v-model="currentPartName" class="input">
          <option value="" disabled>
            ---請選擇---
          </option>
          <option v-for="item in allPartNames" :key="item" :value="item">
            {{ item }}
          </option>
        </select>

        <button class="btn" @click="$fetch()">
          <i class="fa-solid fa-refresh fa-fw" />
          重新整理
        </button>
      </div>
    </div>

    <template v-if="currentMachineName !== '' && currentPartName !== ''">
      <div class="divider">
        查詢結果
      </div>

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
          <div class="stat-title">
            零件名稱
          </div>
          <div class="stat-value">
            {{ currentPartName }}
          </div>
        </div>
      </div>

      <div class="bg-base-200 p-2 rounded overflow-x-auto">
        <table class="table w-full">
          <!-- head -->
          <thead>
            <tr>
              <th>更換日期</th>
              <th>更換人員</th>
              <th>主管</th>
              <th>備註</th>
              <th class="text-right">
                <nuxt-link
                  class="btn"
                  :to="{ name: 'repair-add', query: { machineName: currentMachineName, partName: currentPartName } }"
                >
                  <i class="fa-solid fa-fw fa-plus" /> 新增
                </nuxt-link>
              </th>
            </tr>
          </thead>
          <tbody v-if="currentRepairData.length > 0">
            <repair-item
              v-for="(item, index) in currentRepairData"
              :key="index"
              :meta="item"
              :index="index"
              class="hover"
            />
          </tbody>

          <tbody v-else>
            <tr>
              <td colspan="5" class="text-center">
                無資料
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import RepairItem from '~/components/RepairItem.vue'
import { Repair } from '~/interfaces/Repair'

const sessionMachineNameKey = 'repair-machine-name'
const sessionPartNameKey = 'repair-part-name'

export default Vue.extend({
  components: {
    RepairItem
  },

  data: () => {
    return {
      currentMachineName: '',
      currentPartName: '',
      sessionMachineName: '',
      sessionPartName: ''
    }
  },

  async fetch () {
    await this.$store.dispatch('fetchRepairData')
    await this.$store.dispatch('fetchMachineList')
    await this.$store.dispatch('fetchPartList')
  },

  computed: {
    allMachineNames () {
      return this.$store.getters.allMachineNames
    },

    allPartNames () {
      return this.$store.getters.allPartNames
    },

    currentRepairData () {
      const allData = this.$store.state.repairData as Repair[]
      return allData.filter((item) => {
        return item.machineName === this.currentMachineName && item.partName === this.currentPartName
      })
    }
  },

  watch: {
    currentMachineName (newVal, oldVal) {
      if (newVal === this.$route.query?.machineName || newVal === this.sessionMachineName) {
        return
      }

      window.sessionStorage.setItem(sessionMachineNameKey, newVal)

      const routeName = this.$route.name ?? 'repair'
      const payload = {
        name: routeName,
        query: {
          machineName: newVal,
          partName: this.currentPartName
        }
      }

      if (oldVal === '') {
        this.$router.replace(payload)
        return
      }

      this.$router.push(payload)
    },

    currentPartName (newVal, oldVal) {
      if (newVal === this.$route.query?.partName || newVal === this.sessionPartName) {
        return
      }

      window.sessionStorage.setItem(sessionPartNameKey, newVal)

      const routeName = this.$route.name ?? 'repair'
      const payload = {
        name: routeName,
        query: {
          machineName: this.currentMachineName,
          partName: newVal
        }
      }

      if (oldVal === '') {
        this.$router.replace(payload)
        return
      }

      this.$router.push(payload)
    }
  },

  async mounted () {
    if (this.$route.query?.machineName) {
      this.currentMachineName = this.$route.query?.machineName?.toString()
    } else {
      const sessionMachineName = window.sessionStorage.getItem(sessionMachineNameKey)
      if (sessionMachineName) {
        this.sessionMachineName = sessionMachineName
        this.currentMachineName = sessionMachineName
        await this.replaceQuery()
      }
    }

    if (this.$route.query?.partName) {
      this.currentPartName = this.$route.query?.partName?.toString()
    } else {
      const seesionPartName = window.sessionStorage.getItem(sessionPartNameKey)
      if (seesionPartName) {
        this.sessionPartName = seesionPartName
        this.currentPartName = seesionPartName
        await this.replaceQuery()
      }
    }
  },

  methods: {
    async replaceQuery () {
      const routeName = this.$route.name ?? 'repair'
      const payload = {
        name: routeName,
        query: {
          machineName: this.currentMachineName,
          partName: this.currentPartName
        }
      }
      await this.$router.replace(payload)
    }
  }
})
</script>
