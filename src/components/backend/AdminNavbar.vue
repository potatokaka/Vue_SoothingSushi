<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-gray-800">
    <div class="container-fluid">
      <router-link class="navbar-brand ms-3" to="/">
        <img
          class="h-admin-logo"
          src="../../assets/images/logo_getSoothing_01.svg"
          alt="logo"
        />
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/products"
              >Products</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/orders"
              >Orders</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/coupons"
              >Coupons</router-link
            >
          </li>
        </ul>
        <div>
          <button
            type="button"
            class="btn btn-outline-primary me-3"
            @click="logOut"
          >
            Log out
          </button>
          <router-link to="/cart" class="btn btn-primary"
            >Go to Frontend</router-link
          >
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import checkLogin from '@/mixins/checkLogin'
import logOut from '@/mixins/logOut'
export default {
  mixins: [checkLogin, logOut],
  methods: {}
}
</script>
