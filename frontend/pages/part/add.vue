<template>
  <div class="px-6 py-1 flex flex-col">
    <div class="text-sm breadcrumbs">
      <ul>
        <li>
          <nuxt-link
            :to="{ name: 'part' }"
          >
            零件管理
          </nuxt-link>
        </li>
        <li>零件管理</li>
      </ul>
    </div>

    <div class="grid p-2 bg-base-200 rounded-lg space-y-2">
      <div class="form-control w-full">
        <label class="label">
          <span class="label-text">名稱</span>
          <span class="label-text-alt">＊必要</span>
        </label>
        <input v-model="name" type="text" placeholder="請輸入零件名稱，範例： 儲紗輪(第一段)" class="input input-bordered w-full">
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
      name: '',
      remark: '',

      pending: false,
      requiredColumn: ['name']
    }
  },

  async fetch () {
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

      await this.$store.dispatch('fetchPartList')

      const allPartNames = this.$store.getters.allPartNames as string[] ?? []
      const result = await this.$api.insertNewPart(allPartNames.length + 1, this.name, this.remark, 'Y')

      this.pending = false

      if (result) {
        this.$swal.fire({
          icon: 'success',
          title: '完成'
        })
        this.$router.push({
          name: 'part'
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
