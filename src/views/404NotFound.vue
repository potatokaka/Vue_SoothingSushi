<template>
  <FrontNavbar />
  <div class="container pt-8 text-gray-200">
    <h2 class="text-gray-200 mt-8 mb-5">Oops! Not Found 😂</h2>
    <p>
      The page you are looking for no longer exists. <br />
      Perhaps you can return back to the site’s homepage and see if you can find
      what you are looking for.
    </p>
    <router-link class="btn btn-outline-primary mt-5" to="/"
      >Back To Home</router-link
    >
  </div>
  <Footer />
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
