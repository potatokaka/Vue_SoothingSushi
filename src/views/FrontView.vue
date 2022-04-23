<template>
  <NavbarFront />
  <RouterView />
  <Footer />
</template>

<script>
import NavbarFront from '@/components/NavbarFront.vue'
import Footer from '@/components/Footer.vue'

export default {
  components: {
    NavbarFront,
    Footer
  }
}
</script>
