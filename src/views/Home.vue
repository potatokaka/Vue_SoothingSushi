<template>
  <HeroBanner></HeroBanner>
  <CardList></CardList>
  <SwiperSlide></SwiperSlide>
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
  }
}
</script>
