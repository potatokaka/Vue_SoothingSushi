<template>
  <div class="container-fluid pt-8">
    <h2 class="mt-5 text-center text-gray-200 h1">Team</h2>
    <swiper
      :loop="true"
      :loopFillGroupWithBlank="true"
      :pagination="{
        clickable: true
      }"
      :autoplay="{
        delay: 2500,
        disableOnInteraction: false
      }"
      :modules="modules"
      :breakpoints="{
        320: {
          slidesPerView: 1,
          spaceBetween: 20,
          slidesPerGroup: 1
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 30,
          slidesPerGroup: 4
        }
      }"
      class="mySwiper mt-8"
    >
      <swiper-slide class="text-center">
        <img src="../assets/images/team_01@2x.png" class="h-swiper-card" />
        <h4 class="mt-3 text-gray-200">Dr. Cooper</h4>
        <p class="text-gray-400 fs-7">Co-Founder</p>
      </swiper-slide>
      <swiper-slide class="text-center">
        <img src="../assets/images/team_02@2x.png" class="h-swiper-card" />
        <h4 class="mt-3 text-gray-200">Crypto Vapor</h4>
        <p class="text-gray-400 fs-7">Co-Founder</p>
      </swiper-slide>
      <swiper-slide class="text-center">
        <img src="../assets/images/team_03@2x.png" class="h-swiper-card" />
        <h4 class="mt-3 text-gray-200">Pak Pak</h4>
        <p class="text-gray-400 fs-7">Artist</p>
      </swiper-slide>
      <swiper-slide class="text-center">
        <img src="../assets/images/team_04@2x.png" class="h-swiper-card" />
        <h4 class="mt-3 text-gray-200">Mystery Smith</h4>
        <p class="text-gray-400 fs-7">Scientist</p>
      </swiper-slide>
      <swiper-slide class="text-center">
        <img src="../assets/images/team_05@2x.png" class="h-swiper-card" />
        <h4 class="mt-3 text-gray-200">Buba Vida</h4>
        <p class="text-gray-400 fs-7">Designer</p>
      </swiper-slide>
      <swiper-slide class="text-center">
        <img src="../assets/images/team_06@2x.png" class="h-swiper-card" />
        <h4 class="mt-3 text-gray-200">0x01</h4>
        <p class="text-gray-400 fs-7">Developer</p>
      </swiper-slide>
    </swiper>
  </div>
</template>
<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue/swiper-vue'
// import required modules
import { Autoplay, Pagination } from 'swiper'

// Import Swiper styles
// import 'swiper/css'
import 'swiper/swiper.scss'
// import 'swiper/css/pagination'
import 'swiper/modules/pagination/pagination.min.css'
// import './style.css'

export default {
  data () {
    return {
      modules: [Autoplay, Pagination]
    }
  },
  components: {
    Swiper,
    SwiperSlide
  }
}
</script>
<style>
/* .swiper-pagination-bullet-active {
  background: $primary;
} */
</style>
