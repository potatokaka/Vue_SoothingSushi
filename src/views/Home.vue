<template>
  <HeroBanner />
  <div class="mt-8">
    <CardList :product-query="productQuery">
      <template #title>Featured NFT</template>
    </CardList>
  </div>
  <section class="container-fluid bg-about my-8 py-8">
    <div class="container py-0 py-md-5">
      <div class="row align-items-center">
        <div class="col-md-7 pe-0 pe-md-8 mb-5 mb-md-0">
          <h6 class="text-gray-800">ABOUT</h6>
          <p class="fs-1 fw-bold">
            Our soothing suchi club puts love, sweat & tears into everything we
            make - to break down the walls between human senses and souls.
          </p>
        </div>
        <div class="col-md-5 text-center">
          <img
            src="../assets/images/about-scene.png"
            class="w-about-img"
            alt="about"
          />
        </div>
      </div>
    </div>
  </section>
  <SwiperSlide />
</template>

<script>
import HeroBanner from '@/components/HeroBanner.vue'
import CardList from '@/components/CardList.vue'
import SwiperSlide from '@/components/SwiperSlide.vue'

export default {
  name: 'Home',
  components: {
    HeroBanner,
    CardList,
    SwiperSlide
  },
  data () {
    return {
      productQuery: 'NFT'
    }
  }
}
</script>

<style scoped>
.bg-about {
  background-image: url(../assets/images/bg_greenDots.jpg);
}
</style>
