import Swal from 'sweetalert2'

declare type TVueSwalInstance = typeof Swal & typeof Swal.fire
declare module 'vue/types/vue' {
  interface Vue {
    $swal: TVueSwalInstance
  }
  interface VueConstructor {
    swal: TVueSwalInstance
  }
}
