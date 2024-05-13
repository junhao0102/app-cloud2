<template>
  <tr
    class="hover"
  >
    <th>{{ index + 1 }}</th>
    <td>{{ meta.name }}</td>
    <td>{{ meta.remark }}</td>
    <th class="w-6">
      {{ meta.deviceId }}
    </th>

    <td class="text-right">
      <!-- <nuxt-link
        class="btn"
        :to="{
          name: 'machine-edit',
          query: {
            machineName: meta.name
          }
        }"
      >
        <i class="fa-solid fa-fw fa-pen-to-square" /> 編輯
      </nuxt-link> -->

      <!-- <button class="btn">
        <i class="fa-solid fa-fw fa-gears"></i> 零件設定
      </button> -->

      <!-- <button class="btn">
        <i class="fa-solid fa-fw fa-check"></i>
      </button> -->

      <button class="btn btn-error" @click="deleteMachine">
        <i class="fa-solid fa-fw fa-trash-can" /> 刪除
      </button>
    </td>
  </tr>
</template>

<script lang="ts">
import Vue from 'vue'
import { Machine } from '~/interfaces/Machine'

export default Vue.extend({
  props: {
    meta: {
      type: Object,
      default () {
        return {}
      }
    },

    index: {
      type: Number,
      default: 0
    }
  },

  methods: {
    async deleteMachine () {
      const meta = this.meta as Machine
      const dialogResult = await this.$swal.fire({
        showCancelButton: true,
        focusCancel: true,
        title: '確認刪除',
        text: meta.name,
        footer: '此動作確認後無法撤銷',
        cancelButtonText: '取消',
        confirmButtonText: '刪除',
        confirmButtonColor: '#e33232'
      })

      if (dialogResult.isConfirmed) {
        this.$swal.fire({
          title: '刪除中',
          allowOutsideClick: false,
          allowEscapeKey: false
        })
        this.$swal.showLoading()

        const result = await this.$api.deleteMachineList(meta.name)
        await this.$store.dispatch('fetchMachineList')

        if (result) {
          this.$swal.fire({
            icon: 'success',
            title: '完成'
          })
        } else {
          this.$swal.fire({
            icon: 'error',
            title: '發生錯誤'
          })
        }
      }
    }
  }
})
</script>
