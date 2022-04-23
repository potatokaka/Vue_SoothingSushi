<template>
  <div class="container-fluid px-5 px-lg-8" id="cardList">
    <Loading :active="loadingOverlay"></Loading>
    <h2 class="mt-8 text-center text-gray-200 h1">
      <slot name="title">Title</slot>
    </h2>
    <NavbarProducts
      v-if="showNavbarProducts"
      :categories="categories"
      @emit-all-view="getProducts"
      @emit-filtered-view="getFilteredProducts"
    ></NavbarProducts>

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
            <img
              :src="item.imageUrl"
              data-atropos-offset="-5"
              class="w-100"
              :alt="item.title"
            />
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
          >
            <span class="material-icons-outlined mt-2"> info </span>
          </router-link>
          <button
            class="btn btn-outline-secondary rounded-pill px-4 fw-light me-3"
            type="button"
            @click="updateMyFavorite(item.id)"
            :disabled="isLoadingItem === item.id"
          >
            <span class="material-icons-outlined mt-2"> favorite_border </span>
          </button>
          <button
            class="btn btn-outline-primary rounded-pill px-4 fw-light w-btn-sm"
            type="button"
            @click="addToCart(item.id)"
            :disabled="isLoadingItem === item.id"
          >
            <span
              class="spinner-grow spinner-grow-sm"
              v-if="isLoadingItem === item.id"
            ></span>
            <!-- <span v-else>Get NFT</span> -->
            <span class="material-icons-outlined mt-2" v-else>
              shopping_cart
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Atropos from 'atropos/vue/atropos-vue.esm.js'
import emitter from '../methods/emitter'
import localStorage from '../mixins/localStorage'
import NavbarProducts from '@/components/NavbarProducts.vue'

export default {
  props: ['product-query'],
  data () {
    return {
      allProducts: [],
      products: [],
      categories: [],
      showNavbarProducts: false,
      isLoadingItem: '',
      loadingOverlay: false
    }
  },
  components: {
    Atropos,
    NavbarProducts
  },
  mixins: [localStorage],
  methods: {
    getProducts () {
      this.loadingOverlay = true
      this.$http
        .get(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products`
        )
        .then((res) => {
          // 用 sort 排序，價格由低到高
          this.products = res.data.products.sort((a, b) => a.price - b.price)
          this.getCategories()
          this.loadingOverlay = false
        })
        .catch((err) => {
          this.loadingOverlay = false
          this.$swal({
            toast: true,
            position: 'bottom-end',
            icon: 'error',
            title: err.response.data.message,
            showConfirmButton: false,
            showCloseButton: true,
            iconColor: '#e8584d',
            timer: 30000
          })
        })
    },
    getFilteredProducts (category) {
      this.loadingOverlay = true
      this.$http
        .get(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products?category=${category}`
        )
        .then((res) => {
          // 用 sort 排序，價格由低到高
          this.products = res.data.products.sort((a, b) => a.price - b.price)
          console.log('getFilteredProducts', category)
          this.loadingOverlay = false
        })
        .catch((err) => {
          this.loadingOverlay = false
          this.$swal({
            toast: true,
            position: 'bottom-end',
            icon: 'error',
            title: err.response.data.message,
            showConfirmButton: false,
            showCloseButton: true,
            iconColor: '#e8584d',
            timer: 30000
          })
        })
    },
    getCategories () {
      // 取出 allProducts 所有產品的 category
      const tempCategories = this.products.map((item) => item.category)
      // 用 set 篩掉重複的內容
      this.categories = new Set(tempCategories)
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
          this.$swal({
            toast: true,
            position: 'bottom-end',
            icon: 'success',
            title: res.data.message,
            showConfirmButton: false,
            showCloseButton: true,
            iconColor: '#FFBCAA',
            timer: 3000
          })
          emitter.emit('get-cart') // 觸發 NavbarFront 的監聽
          this.isLoadingItem = ''
        })
        .catch((err) => {
          this.$swal({
            toast: true,
            position: 'bottom-end',
            icon: 'error',
            title: err.response.data.message,
            showConfirmButton: false,
            showCloseButton: true,
            iconColor: '#e8584d',
            timer: 30000
          })
          this.isLoadingItem = ''
        })
    }
  },
  mounted () {
    // 先判斷 props 傳入的分類，再抓對應的產品資料
    if (this.productQuery === 'ALL') {
      this.getProducts()
      this.showNavbarProducts = true
    } else {
      this.getFilteredProducts(this.productQuery)
      this.showNavbarProducts = false
    }
  }
}
</script>

<style>
.my-atropos {
  width: 100%;
}
</style>
