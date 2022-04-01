<template>
  <div class="position-absolute w-100 z-index-1000">
    <div class="container pe-3">
      <nav class="navbar px-0 navbar-expand-lg navbar-dark">
        <router-link
          class="navbar-brand position-absolute"
          style="left: 50%; transform: translate(-50%, -10%); top: 50%"
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
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
          class="collapse navbar-collapse custom-header-md-open"
          id="navbarNav"
        >
          <ul class="navbar-nav">
            <li class="nav-item active">
              <!-- <a class="nav-link ps-0 link-white me-3" href="#cardList"
                >About</a
              > -->
              <router-link to="/#cardList" class="nav-link ps-0 link-white me-3"
                >About</router-link
              >
            </li>
            <li class="nav-item">
              <!-- <a class="nav-link link-white me-3" href="./detail.html"
                >Team</a
              > -->
              <router-link to="/#team" class="nav-link ps-0 link-white me-3"
                >Team</router-link
              >
            </li>
          </ul>
        </div>
        <div class="d-flex">
          <!-- <a href="#" class="link-white me-5 disabled">
            <i class="bi bi-heart fs-5"></i>
          </a> -->
          <router-link to="/cart" class="link-white position-relative">
            <i class="bi bi-cart fs-5 pe-1"></i>
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
  </div>
</template>
<script>
import emitter from '../methods/emitter'
export default {
  data () {
    return {
      cart: {}
    }
  },
  methods: {
    getCart () {
      this.$http
        .get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`)
        .then((res) => {
          this.cart = res.data.data
          console.log(res)
        })
        .catch((err) => {
          console.log(err.response.data)
        })
    }
  },
  mounted () {
    this.getCart()
    emitter.on('get-cart', () => {
      this.getCart()
    })
  }
}
</script>
