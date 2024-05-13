<template>
  <div class="sticky top-0 flex w-full z-30 bg-opacity-90 backdrop-blur border-b border-base-300">
    <div class="navbar bg-base-100">
      <div class="flex-1 justify-between">
        <div class="flex lg:hidden">
          <label for="my-drawer" class="btn btn-square btn-ghost drawer-button">
            <i class="fa-solid fa-bars" />
          </label>

          <div>
            <div class="btn btn-ghost normal-case text-xl">
              針織機健康狀況分析
            </div>
          </div>
        </div>

        <div v-if="mockMode" class="text-red-700">
          開發模擬模式
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mockMode } from '~/services/mockMode'

export default Vue.extend({
  data () {
    return {
      mockMode: mockMode()
    }
  }
})
</script>
