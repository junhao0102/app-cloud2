<template>
  <div class="drawer-side">
    <label for="my-drawer" class="drawer-overlay" />
    <aside class="bg-base-200 w-72">
      <div class="z-20 bg-base-200 bg-opacity-90 backdrop-blur sticky top-0 items-center gap-2 px-4 pb-2 hidden lg:flex">
        <a href="/" aria-current="page" aria-label="Homepage" class="flex-0 btn btn-ghost px-2">
          <div class="text-primary inline-flex text-lg transition-all duration-200 md:text-2xl">
            <span class="text-base-content">
              針織機健康狀況分析
            </span>
          </div>
        </a>

        <!-- <a href="/docs/changelog" class="link link-hover font-mono text-xs text-opacity-50">
          <div data-tip="Changelog" class="tooltip tooltip-bottom">
            0.1.0-alpha
          </div>
        </a> -->
      </div>

      <ul class="menu menu-compact flex flex-col p-0 px-4">
        <!-- Sidebar content here -->
        <li class="menu-title">
          <span>Ver. 1.0.1</span>
        </li>
        <li class="menu-title">
          <span>監控</span>
        </li>
        <li>
          <nuxt-link class="flex gap-4 text-lg" to="/" exact>
            <span class="flex-none">
              <i class="fa-solid fa-fw fa-gauge-high" />
            </span>

            <span class="flex-1">
              儀表版
            </span>
          </nuxt-link>
        </li>

        <li>
          <nuxt-link class="flex gap-4 text-lg" to="/monitor">
            <span class="flex-none">
              <i class="fa-solid fa-fw fa-desktop" />
            </span>

            <span class="flex-1">
              機台資訊
            </span>
          </nuxt-link>
        </li>

        <li />

        <li class="menu-title">
          <span>事件</span>
        </li>

        <li>
          <nuxt-link class="flex gap-4 text-lg" to="/repair">
            <span class="flex-none">
              <i class="fa-regular fa-fw fa-calendar" />
            </span>

            <span class="flex-1">
              維修記錄
            </span>
          </nuxt-link>
        </li>

        <li />

        <li class="menu-title">
          <span>系統</span>
        </li>

        <li>
          <nuxt-link class="flex gap-4 text-lg" to="/machine">
            <span class="flex-none">
              <i class="fa-solid fa-fw fa-hard-drive" />
            </span>

            <span class="flex-1">
              機台管理
            </span>
          </nuxt-link>
        </li>

        <li>
          <nuxt-link class="flex gap-4 text-lg" to="/part">
            <span class="flex-none">
              <i class="fa-solid fa-fw fa-gears" />
            </span>

            <span class="flex-1">
              零件管理
            </span>
          </nuxt-link>
        </li>

        <!-- <li>
          <a class="flex gap-4 text-lg">
            <span class="flex-none">
              <i class="fa-solid fa-fw fa-server" />
            </span>

            <span class="flex-1">
              系統設定
            </span>
          </a>
        </li> -->
      </ul>
    </aside>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({

})
</script>

<style>

</style>
