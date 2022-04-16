<template>
  <div class="container-fluid px-5 px-lg-8 mt-8" id="cardList">
    <h2 class="mt-8 text-center text-gray-200 h1">Featured NFT</h2>
    <div class="row row-cols-1 row-cols-lg-3 g-5 mt-3">
      <div class="col text-gray-200" v-for="item in products" :key="item.id">
        <Atropos
          class="my-atropos"
          :active-offset="40"
          :shadow="false"
          :highlight="false"
          :shadow-scale="1.05"
          :rotateXMax="20"
          :rotateYMax="20"
        >
          <router-link :to="`/product/${item.id}`">
            <img :src="item.imageUrl" data-atropos-offset="-5" class="w-100" />
            <h3 class="cardTitle fs-2">{{ item.title }}</h3>
          </router-link>
        </Atropos>
        <p class="d-flex mt-3">
          <img
            src="../assets/images/icon/icon_eth.svg"
            alt="ethMark"
            class="inline-block me-3"
          />
          <span class="text-primary fs-4 ff-mont"
            >{{ item.price }} {{ item.unit }}</span
          >
        </p>
        <p class="text-gray-400 fs-7 mt-3 fw-light">{{ item.description }}</p>
        <div class="d-flex mt-3">
          <router-link
            href="#"
            class="btn btn-outline-secondary me-3 rounded-pill px-4 fw-light"
            :to="`/product/${item.id}`"
            >View more</router-link
          >
          <button
            class="btn btn-outline-primary rounded-pill px-4 fw-light w-btn-md"
            @click="addToCart(item.id)"
            :disabled="isLoadingItem === item.id"
          >
            <span
              class="spinner-grow spinner-grow-sm"
              v-if="isLoadingItem === item.id"
            ></span>
            <span v-else>Get NFT</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Atropos from 'atropos/vue/atropos-vue.esm.js'
import emitter from '../methods/emitter'

export default {
  data () {
    return {
      products: [],
      isLoadingItem: ''
    }
  },
  components: {
    Atropos
  },
  methods: {
    getProducts () {
      this.$http
        .get(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products`
        )
        .then((res) => {
          // 用 sort 排序，價格由低到高
          this.products = res.data.products.sort((a, b) => a.price - b.price)
        })
        .catch((err) => {
          console.log(err.response.data)
        })
    },
    addToCart (id, qty = 1) {
      this.isLoadingItem = id

      const obj = {
        data: {
          product_id: id,
          qty: qty
        }
      }
      this.$http
        .post(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`,
          obj
        )
        .then((res) => {
          console.log(res.data)
          alert(res.data.message) // 觸發 FrontNavbar 的監聽
          emitter.emit('get-cart')
          this.isLoadingItem = ''
        })
        .catch((err) => {
          console.log(err.response.data)
          this.isLoadingItem = ''
        })
    }
  },
  mounted () {
    this.getProducts()
  }
}
</script>
<style>
.my-atropos {
  width: 100%;
}
</style>
