<template>
  <div class="px-6 py-1 flex flex-col gap-2">
    <div class="text-sm breadcrumbs">
      <ul>
        <li>機台管理</li>
      </ul>
    </div>

    <div class="flex p-2 rounded-lg bg-base-200 justify-end gap-2">
      <nuxt-link
        class="btn"
        :to="{ name: 'machine-add' }"
      >
        <i class="fa-solid fa-fw fa-plus" /> 新增
      </nuxt-link>

      <button v-if="$fetchState.pending" class="btn">
        <i class="fa-solid fa-refresh fa-fw fa-spin" />
        載入中
      </button>

      <button v-else class="btn" @click="$fetch()">
        <i class="fa-solid fa-refresh fa-fw" />
        重新整理
      </button>
    </div>

    <div class="bg-base-200 p-2 rounded overflow-x-auto">
      <table class="table w-full">
        <!-- head -->
        <thead>
          <tr>
            <th>#</th>
            <th>名稱</th>
            <th>備註</th>
            <th>Yotoma ID</th>
            <th />
          </tr>
        </thead>
        <tbody v-if="machineList.length > 0">
          <list-machine-item
            v-for="(machine, index) in machineList"
            :key="index"
            :meta="machine"
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
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ListMachineItem from '~/components/ListMachineItem.vue'

export default Vue.extend({
  name: 'DevicePage',

  components: {
    ListMachineItem
  },

  data: () => {
    return {
    }
  },

  async fetch () {
    await this.$store.dispatch('fetchMachineList')
  },

  computed: {
    machineList () {
      return this.$store.state.machineList
    }
  },

  mounted () {
  },

  methods: {
  }
})
</script>
