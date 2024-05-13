import { APIs } from './APIs'

declare module 'vue/types/vue' {
  interface Vue {
    $api: APIs
  }
}

declare module 'vuex/types/index' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Store<S> {
    $api: APIs
  }
}
