<template>
  <div class="flex flex-col">
    <div class="drawer drawer-mobile">
      <input id="my-drawer" type="checkbox" class="drawer-toggle">

      <div ref="contentContainer" data-theme="light" class="drawer-content">
        <navbar />
        <nuxt />
      </div>

      <sidebar />
    </div>

    <!-- <portal-target name="modal" /> -->
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Navbar from '~/components/Navbar.vue'
import Sidebar from '~/components/Sidebar.vue'

export default Vue.extend({
  components: {
    Navbar,
    Sidebar
  },

  middleware: [
    'URLCredentialsRedirect'
  ],

  data: () => {
    return {
    }
  },

  computed: {
  },

  mounted () {
    // this.$store.dispatch('fetchAllName')
  },

  beforeDestroy () {
  },

  methods: {
    requestFullscreen () {
      const element = this.$refs.contentContainer
      if (element instanceof Element) {
        element.requestFullscreen()
      }
    },

    exitFullscreen () {
      if (window?.document) {
        window.document.exitFullscreen()
      }
    }
  }
})
</script>

<style>

</style>
