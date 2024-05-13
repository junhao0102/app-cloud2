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
          <span class="label-text-alt">ID: {{ id }}</span>
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
import { Part } from '~/interfaces/Part'
export default Vue.extend({
  data: () => {
    return {
      id: 0,
      name: '',
      remark: '',

      pending: false,
      requiredColumn: ['name']
    }
  },

  async fetch () {
  },

  async mounted () {
    await this.$store.dispatch('fetchPartList')
    const targetId = Number.parseInt(this.$route.query.id.toString() ?? '')
    const partList = this.$store.state.partList as Part[]
    const part = partList.find((item) => {
      return item.id === targetId
    })

    if (part) {
      this.id = part.id
      this.name = part.name
      this.remark = part.remark
    } else {
      this.$swal({
        icon: 'warning',
        title: '零件不存在'
      })
      this.$router.replace({
        name: 'part'
      })
    }
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
      const result = await this.$api.updatePart(this.id, this.name, this.remark)

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
