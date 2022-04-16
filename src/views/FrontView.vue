<template>
  <FrontNavbar></FrontNavbar>
  <router-view />

  <Footer></Footer>
</template>
<script>
import FrontNavbar from '@/components/FrontNavbar.vue'
import Footer from '@/components/Footer.vue'

export default {
  components: {
    FrontNavbar,
    Footer
  }
}
</script>
