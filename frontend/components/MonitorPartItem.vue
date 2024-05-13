<template>
  <tr
    class="hover"
  >
    <th>{{ meta.partName }}</th>

    <th>{{ meta.initVal }} 天</th>

    <td>{{ meta.meanDay }} 天</td>

    <td>{{ meta.meanCount }} 轉</td>

    <td>
      <template v-if="meta.meanCount === 0">
        {{ meta.meanDay }} 天
      </template>

      <template v-else>
        {{ meta.meanCount }} 轉
      </template>
    </td>

    <td :class="[type[meta.partHealthy]]">
      <i class="fa-solid fa-fw fa-2x" :class="[typeIcon[meta.partHealthy]]" />
      <br>
      {{ typeLabel[meta.partHealthy] }}
    </td>

    <td>
      <template v-if="meta.useState === 'Y'">
        <i class="fa-solid fa-fw fa-check" />
        <br>
        <span>啟用中</span>
      </template>

      <template v-else>
        <i class="fa-solid fa-fw fa-times" />
        <br>
        <span>停用</span>
      </template>
    </td>

    <td class="text-right">
      <button v-if="meta.useState === 'Y'" class="btn" @click="switchUseState">
        <i class="fa-regular fa-fw fa-circle-stop" />
        <div class="hidden xl:inline-block">
          停用
        </div>
      </button>

      <button v-else class="btn" @click="switchUseState">
        <i class="fa-regular fa-fw fa-circle-play" />
        <div class="hidden xl:inline-block">
          啟用
        </div>
      </button>

      <button class="btn" @click="changeInitVal">
        <i class="fa-solid fa-fw fa-pen-to-square" />
        <div class="hidden xl:inline-block">
          修改
        </div>
      </button>

      <nuxt-link
        class="btn"
        :to="{
          name: 'repair',
          query: {
            machineName: meta.machineName,
            partName: meta.partName
          }
        }"
      >
        <i class="fa-solid fa-fw fa-wrench" />
        <div class="hidden xl:inline-block">
          維修紀錄
        </div>
      </nuxt-link>

      <!-- <button class="btn">
        <i class="fa-solid fa-fw fa-gears" /> 詳細分析
      </button> -->
    </td>
  </tr>
</template>

<script lang="ts">
import Vue from 'vue'
import { MachineTable } from '~/interfaces/MachineTable'
import { UseState } from '~/interfaces/UseState'
export default Vue.extend({
  props: {
    meta: {
      type: Object,
      default () {
        return {}
      }
    }
  },

  data () {
    return {
      type: {
        G: 'text-success',
        Y: 'text-warning',
        R: 'text-error'
      },

      typeIcon: {
        G: 'fa-heart-circle-check',
        Y: 'fa-heart-circle-exclamation',
        R: 'fa-heart-circle-xmark'
      },

      typeLabel: {
        G: '良好',
        Y: '警示',
        R: '已達壽命'
      }
    }
  },

  methods: {
    async switchUseState () {
      this.$swal.fire({
        title: '切換中',
        allowOutsideClick: false,
        allowEscapeKey: false
      })
      this.$swal.showLoading()

      const meta = this.meta as MachineTable
      const newUseState: UseState = meta.useState === 'Y' ? 'N' : 'Y'
      const result = await this.$api.updateMachineTable(meta.machineName, meta.partName, meta.initVal, newUseState, 'use_state')
      await this.$store.dispatch('fetchMachineTable')

      if (result) {
        this.$swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: '完成',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', this.$swal.stopTimer)
            toast.addEventListener('mouseleave', this.$swal.resumeTimer)
          }
        })
      } else {
        this.$swal.fire({
          icon: 'error',
          title: '發生錯誤'
        })
      }
    },

    async changeInitVal () {
      const meta = this.meta as MachineTable
      const { value: newInitVal } = await this.$swal.fire({
        title: '請輸入新的零件更換天數（經驗值）',
        input: 'number',
        inputLabel: meta.partName,
        inputValue: meta.initVal,
        showCancelButton: true,
        confirmButtonText: '修改',
        cancelButtonText: '取消',
        inputValidator: (value) => {
          const newInitValInt = Number.parseInt(value)
          if (!value || Number.isNaN(newInitValInt) || newInitValInt < 1) {
            return '請輸入正確數值'
          }
          return null
        }
      })

      if (newInitVal) {
        const newInitValInt = Number.parseInt(newInitVal)

        this.$swal.fire({
          title: '修改中',
          allowOutsideClick: false,
          allowEscapeKey: false
        })
        this.$swal.showLoading()

        const meta = this.meta as MachineTable
        const result = await this.$api.updateMachineTable(meta.machineName, meta.partName, newInitValInt, meta.useState, 'init_val')
        await this.$store.dispatch('fetchMachineTable')

        if (result) {
          this.$swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'success',
            title: '完成',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', this.$swal.stopTimer)
              toast.addEventListener('mouseleave', this.$swal.resumeTimer)
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
  }
})
</script>
