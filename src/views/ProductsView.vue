<template>
  <div class="pt-8">
    <CardList :product-query="productQuery">
      <template #title>Our Products</template>
    </CardList>
  </div>
</template>

<script>
import CardList from '@/components/CardList.vue'

export default {
  name: 'Home',
  components: {
    CardList
  },
  data () {
    return {
      productQuery: 'ALL'
    }
  }
}
</script>
