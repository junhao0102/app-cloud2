// need to check
<template>
  <div class="px-6 py-1 flex flex-col">
    <div class="text-sm breadcrumbs">
      <ul>
        <li>
          <nuxt-link
            :to="{ name: 'machine' }"
          >
            機台管理
          </nuxt-link>
        </li>
        <li>機台新增</li>
      </ul>
    </div>

    <div class="grid p-2 bg-base-200 rounded-lg space-y-2">
      <div>又得馬控制器</div>
      <div>
        <select v-model="deviceId" class="input w-full">
          <option value="0">
            ---不連結---
          </option>

          <option v-for="(device, index) in $store.state.linkDevices" :key="index" :value="device.deviceId">
            {{ device.aliasId }} - {{ device.name }}
          </option>
        </select>
      </div>

      <div>名稱</div>
      <div>
        <input v-model="name" class="input w-full" type="text" placeholder="請輸入機台名稱，範例： T101">
      </div>

      <div class="form-control w-full">
        <label class="label">
          <span class="label-text">零件更換天數（經驗值）</span>
        </label>
        <input v-model="initVal" type="number" min="1" placeholder="請輸入天數，範例： 60" class="input input-bordered w-full">
      </div>

      <div>備註</div>
      <div>
        <textarea v-model="remark" class="textarea textarea-bordered w-full" placeholder="" />
      </div>

      <div class="justify-self-end">
        <button v-if="pending" class="btn">
          載入中
        </button>

        <button v-else class="btn" @click="submit">
          新增
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data: () => {
    return {
      facotryList: [] as any[],
      deviceId: '0',
      name: '',
      initVal: '1',
      remark: '',
      pending: false
    }
  },

  async fetch () {
    await this.$store.dispatch('fetchMachineList')
    await this.$store.dispatch('fetchLinkDevices')
  },

  methods: {
    async submit (e: Event) {
      e.preventDefault()

      if (this.pending) {
        return
      }

      this.pending = true

      const deviceId = parseInt(this.deviceId)
      const initVal = parseInt(this.initVal)
      const result = await this.$api.insertNewMachine(this.name, deviceId, initVal, this.remark)

      this.pending = false

      if (result) {
        this.$swal.fire({
          icon: 'success',
          title: '完成'
        })
        this.$router.push({
          name: 'machine'
        })
      } else {
        this.$swal.fire({
          icon: 'error',
          title: '發生錯誤'
        })
      }
    }
  }
})
</script>
