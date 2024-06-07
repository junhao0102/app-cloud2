<template>
  <div class="px-6 py-1 flex flex-col">
    <div class="text-sm breadcrumbs">
      <ul>
        <li>
          <nuxt-link
            :to="{
              name: 'repair',
              query: {
                machineName,
                partName
              }
            }"
          >
            維修記錄
          </nuxt-link>
        </li>
        <li>記錄新增</li>
      </ul>
    </div>

    <div class="grid p-2 bg-base-200 rounded-lg space-y-2">
      <div class="form-control w-full">
        <label class="label">
          <span class="label-text">機台名稱</span>
          <span class="label-text-alt" />
        </label>
        <input class="input input-bordered w-full" type="text" :value="machineName" readonly>
        <label class="label">
          <span class="label-text-alt" />
          <span class="label-text-alt">系統帶入，無法修改</span>
        </label>
      </div>

      <div class="form-control w-full">
        <label class="label">
          <span class="label-text">零件名稱</span>
          <span class="label-text-alt" />
        </label>
        <input class="input input-bordered w-full" type="text" :value="partName" readonly>
        <label class="label">
          <span class="label-text-alt" />
          <span class="label-text-alt">系統帶入，無法修改</span>
        </label>
      </div>

      <div class="form-control w-full">
        <label class="label">
          <span class="label-text">維修日期</span>
          <span class="label-text-alt">＊必要</span>
        </label>
        <input v-model="date" :max="maxDate" class="input input-bordered w-full" type="date">
        <label class="label">
          <span class="label-text-alt" />
          <span class="label-text-alt" />
        </label>
      </div>

      <div class="form-control w-full">
        <label class="label">
          <span class="label-text">維修人員</span>
          <span class="label-text-alt">＊必要</span>
        </label>
        <input v-model="man" class="input input-bordered w-full" type="text">
        <label class="label">
          <span class="label-text-alt" />
          <span class="label-text-alt" />
        </label>
      </div>

      <div class="form-control w-full">
        <label class="label">
          <span class="label-text">主管</span>
          <span class="label-text-alt">＊必要</span>
        </label>
        <input v-model="director" class="input input-bordered w-full" type="text">
        <label class="label">
          <span class="label-text-alt" />
          <span class="label-text-alt" />
        </label>
      </div>

      <div class="form-control w-full">
        <label class="label">
          <span class="label-text">備註</span>
          <span class="label-text-alt" />
        </label>
        <textarea v-model="remark" class="textarea textarea-bordered w-full" placeholder="" />
        <label class="label">
          <span class="label-text-alt" />
          <span class="label-text-alt" />
        </label>
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
      machineName: '',
      partName: '',
      pending: false,

      date: '',
      maxDate: '',
      man: '',
      director: '',
      remark: '',

      requiredColumn: ['machineName', 'partName', 'date', 'man', 'director']
    }
  },

  async fetch () {
  },

  mounted () {
    this.machineName = this.$route.query?.machineName.toString() ?? 'unknow'
    this.partName = this.$route.query?.partName.toString() ?? 'unknow'
    const today = new Date()
    const year = today.getFullYear().toString()
    const month = (today.getMonth() + 1).toString().padStart(2, '0')
    const day = today.getDate().toString().padStart(2, '0')
    const todayString = `${year}-${month}-${day}`
    this.date = todayString
    this.maxDate = todayString
  },

  methods: {
    async submit (e: Event) {
      e.preventDefault()

      if (this.pending) {
        return
      }

      if (this.requiredColumn.find(column => this.$data[column] === '')) {
        this.$swal.fire({
          icon: 'warning',
          title: '必要欄位未填寫'
        })
        return
      }

      this.pending = true

      const result = await this.$api.insertNewRepair(this.machineName, this.partName, this.date, this.man, this.director, this.remark)

      this.pending = false

      if (result) {
        this.$swal.fire({
          icon: 'success',
          title: '完成'
        })
        this.$router.push({
          name: 'repair',
          query: {
            machineName: this.machineName,
            partName: this.partName
          }
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
