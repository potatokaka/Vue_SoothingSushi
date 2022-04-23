<template>
  <div class="position-absolute w-100 z-index-1000 top-0">
    <div class="px-0 px-md-8" ref="hambg">
      <nav class="navbar px-0 navbar-expand-lg navbar-dark px-3">
        <router-link
          class="navbar-brand position-absolute logo-header-wrapper"
          to="/"
        >
          <img
            class="logo-header"
            src="../assets/images/logo_getSoothing_01.svg"
            alt="logo"
          />
        </router-link>
        <button
          class="navbar-toggler"
          type="button"
          @click="toggleNavHam"
          ref="navtoggler"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
          class="collapse navbar-collapse custom-header-md-open px-3 px-md-0 mt-8 mt-md-0"
          ref="collapse"
        >
          <ul class="navbar-nav mt-5 mt-md-0">
            <li class="nav-item active">
              <router-link
                to="/products"
                class="nav-link ps-0 link-white me-3"
                @click="closeNavHam"
                >Products</router-link
              >
            </li>
            <li class="nav-item">
              <router-link
                to="/roadmap"
                class="nav-link ps-0 link-white me-3"
                @click="closeNavHam"
                >Roadmap</router-link
              >
            </li>
          </ul>
        </div>
        <div class="d-flex">
          <button
            type="button"
            class="btn btn-transparent p-0 link-white me-4 position-relative"
            @click.prevent="toggleFavModal"
          >
            <span class="material-icons-outlined"> favorite_border </span>
            <span
              class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger fs-9 mt-1"
              v-if="this.myFavorite.length > 0"
            >
              {{ this.myFavorite.length }}
              <span class="visually-hidden">cart items</span>
            </span>
          </button>
          <router-link
            to="/cart"
            class="link-white position-relative pt-1"
            @click="closeNavHam"
          >
            <span class="material-icons-outlined"> shopping_cart </span>
            <span
              class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger fs-9 mt-1"
              v-if="cart.carts?.length > 0"
            >
              {{ cart.carts?.length }}
              <span class="visually-hidden">cart items</span>
            </span>
          </router-link>
        </div>
      </nav>
    </div>
    <!-- Modal Favorite -->
    <ModalFavorite
      :class="{ 'd-block': isFavOpen }"
      @emit-toggle-modal="toggleFavModal"
    ></ModalFavorite>
  </div>
</template>

<script>
import emitter from '../methods/emitter'
import ModalFavorite from '@/components/ModalFavorite.vue'
import localStorage from '../mixins/localStorage'
import Collapse from 'bootstrap/js/dist/collapse'

export default {
  data () {
    return {
      cart: {},
      isFavOpen: false,
      collapse: ''
    }
  },
  components: {
    ModalFavorite
  },
  mixins: [localStorage],
  methods: {
    getCart () {
      this.$http
        .get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`)
        .then((res) => {
          this.cart = res.data.data
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
            timer: 3000
          })
        })
    },
    toggleFavModal () {
      this.isFavOpen = !this.isFavOpen
    },
    closeNavHam () {
      this.collapse.hide()
      this.$refs.hambg.classList.remove('collapse-bg')
      this.$refs.navtoggler.classList.remove('navTogglerOpen')
    },
    toggleNavHam () {
      this.collapse.toggle()
      this.$refs.hambg.classList.toggle('collapse-bg')
      this.$refs.navtoggler.classList.toggle('navTogglerOpen')
    }
  },
  mounted () {
    this.getCart()
    // 漢堡選單
    this.collapse = new Collapse(this.$refs.collapse, {
      toggle: false
    })
    // 監聽-購物車
    emitter.on('get-cart', () => {
      this.getCart()
    })
  }
}
</script>
