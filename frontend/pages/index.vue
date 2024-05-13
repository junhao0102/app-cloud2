<template>
  <div class="flex flex-col p-4 space-y-2">
    <div class="stats shadow bg-base-200 w-full stats-vertical sm:stats-horizontal">
      <div class="stat">
        <div class="stat-title">
          機台數量
        </div>
        <div class="stat-value">
          {{ items.length }}
        </div>
      </div>

      <div class="stat">
        <div class="stat-figure text-success">
          <i class="fa-solid fa-heart-circle-check fa-fw fa-2xl" />
        </div>
        <div class="stat-title">
          健康
        </div>
        <div class="stat-value text-success">
          {{ healthCount }}
        </div>
        <div class="stat-desc">
          零件狀況良好
        </div>
      </div>

      <div class="stat">
        <div class="stat-figure text-warning">
          <i class="fa-solid fa-heart-circle-exclamation fa-fw fa-2xl" />
        </div>
        <div class="stat-title">
          警示
        </div>
        <div class="stat-value text-warning">
          {{ warnCount }}
        </div>
        <div class="stat-desc">
          部分零件狀況已達八成平均壽命
        </div>
      </div>

      <div class="stat">
        <div class="stat-figure text-error">
          <i class="fa-solid fa-heart-circle-xmark fa-fw fa-2xl" />
        </div>
        <div class="stat-title">
          已達壽命
        </div>
        <div class="stat-value text-error">
          {{ errorCount }}
        </div>
        <div class="stat-desc">
          部分零件狀況已超過平均壽命
        </div>
      </div>
    </div>

    <div class="flex p-2 rounded-lg bg-base-200 justify-end gap-2">
      <div class="self-center">
        <i class="fa-solid fa-filter fa-fw" />

        <select v-model="typeFilter" class="input">
          <option value="all">
            全部
          </option>
          <option value="G">
            健康
          </option>
          <option value="Y">
            警示
          </option>
          <option value="R">
            已達壽命
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

    <div v-if="filterItems.length > 0" class="grid grid-cols-2 lg:grid-cols-6 gap-2">
      <nuxt-link
        v-for="(item, index) in filterItems"
        :key="index"
        class="p-3 rounded-lg w-full h-12 text-xl text-center truncate"
        :class="type[item.healthyState]"
        :to="{
          name: 'monitor',
          query: {
            machineName: item.name
          }
        }"
      >
        {{ item.name }}
      </nuxt-link>
    </div>

    <div v-else>
      無資料
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { MachineHealthy } from '~/interfaces/MachineHealthy'

export default Vue.extend({
  data: () => {
    return {
      type: {
        G: 'bg-success text-success-content',
        Y: 'bg-warning text-warning-content',
        R: 'bg-error text-error-content'
      },

      typeFilter: 'all'
    }
  },

  async fetch () {
    await this.$store.dispatch('fetchMachineHealthy')
    await this.$store.dispatch('fetchMachineList')
  },

  computed: {
    allMachineNames (): string[] {
      return this.$store.state.allMachineNames ?? []
    },

    items (): MachineHealthy[] {
      return this.$store.state.machineHealthy
    },

    filterItems (): MachineHealthy[] {
      const items = this.items as MachineHealthy[]

      if (this.typeFilter === 'all') {
        return items
      }

      return items.filter(item => item.healthyState === this.typeFilter)
    },

    healthCount () {
      const items = this.items as MachineHealthy[]
      return items.filter(item => item.healthyState === 'G').length
    },

    warnCount () {
      const items = this.items as MachineHealthy[]
      return items.filter(item => item.healthyState === 'Y').length
    },

    errorCount () {
      const items = this.items as MachineHealthy[]
      return items.filter(item => item.healthyState === 'R').length
    }
  },

  mounted () {
  }
})
</script>
