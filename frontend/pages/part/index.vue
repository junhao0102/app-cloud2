<template>
  <div class="px-6 py-1 flex flex-col gap-2">
    <div class="text-sm breadcrumbs">
      <ul>
        <li>零件管理</li>
      </ul>
    </div>

    <div class="flex p-2 rounded-lg bg-base-200 justify-end gap-2">
      <nuxt-link
        class="btn"
        :to="{ name: 'part-add' }"
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
            <th>系統流水號</th>
            <th>名稱</th>
            <th>備註</th>
            <th />
          </tr>
        </thead>
        <tbody v-if="partList.length > 0">
          <list-part-item
            v-for="(part, index) in partList"
            :key="index"
            :meta="part"
            :index="index"
          />
        </tbody>

        <tbody v-else>
          <tr>
            <td colspan="4" class="text-center">
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
import ListPartItem from '~/components/ListPartItem.vue'

export default Vue.extend({
  name: 'DevicePage',

  components: {
    ListPartItem
  },

  data: () => {
    return {
      deviceList: [] as any[],
      devices: [
        '儲紗輪(第一段)',
        '儲紗輪(第二段)',
        '儲紗輪(第三段)',
        '儲紗輪(第四段)',
        '送紗皮帶(第一段)',
        '送紗皮帶(第二段)'
      ] as any[]
    }
  },

  async fetch () {
    await this.$store.dispatch('fetchPartList')
  },

  computed: {
    partList () {
      return this.$store.state.partList
    }
  },

  mounted () {
  },

  methods: {
  }
})
</script>
