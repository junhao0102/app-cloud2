<template>
  <tr
    class="hover"
  >
    <th>{{ meta.date }}</th>
    <td>{{ meta.man }}</td>
    <td>{{ meta.director }}</td>
    <td>{{ meta.remark }}</td>

    <td class="text-right">
      <!-- <div
        class="btn"
      >
        <i class="fa-solid fa-fw fa-pen-to-square" /> 修改
      </div> -->

      <button class="btn btn-error" @click="deleteRepairData">
        <i class="fa-solid fa-fw fa-trash-can" /> 刪除
      </button>
    </td>
  </tr>
</template>

<script lang="ts">
import Vue from 'vue'
import { Repair } from '~/interfaces/Repair'

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
    async deleteRepairData () {
      const meta = this.meta as Repair
      const dialogResult = await this.$swal.fire({
        showCancelButton: true,
        focusCancel: true,
        title: '確認刪除',
        text: `${meta.date} - ${meta.man}`,
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

        const result = await this.$api.deleteRepairData(meta.machineName, meta.partName, meta.date, meta.man, meta.director)
        await this.$store.dispatch('fetchRepairData')

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
