<template>
  <div class="container pt-8 text-gray-200">
    <div class="mt-6">
      <h3 class="mt-3 mb-4">Cart</h3>
      <div class="row">
        <div class="col-md-8">
          <table class="table text-gray-200">
            <thead>
              <tr>
                <th scope="col" class="border-0 ps-0">Product</th>
                <th scope="col" class="border-0">Amount</th>
                <th scope="col" class="border-0">Price</th>
                <th scope="col" class="border-0"></th>
              </tr>
            </thead>
            <tbody>
              <template v-if="cart.carts?.length > 0">
                <tr
                  class="border-bottom border-top"
                  v-for="item in cart.carts"
                  :key="item.id"
                >
                  <th scope="row" class="border-0 px-0 font-weight-normal py-4">
                    <button
                      class="btn btn-outline-dark border-0 py-2 me-3 link-white bg-transparent"
                      type="button"
                      id="button-addon1"
                      @click="deleteCartItem(item.id)"
                    >
                      <span class="material-icons-outlined"> clear </span>
                    </button>
                    <img
                      :src="item.product.imageUrl"
                      :alt="item.product.title"
                      class="h-cart-view-img object-fit"
                    />
                    <p class="mb-0 fw-bold ms-3 d-inline-block">
                      {{ item.product.title }}
                    </p>
                  </th>
                  <td class="border-0 align-middle w-cart-view-col">
                    <div class="input-group pe-0 pe-lg-5 d-flex flex-nowrap">
                      <div class="input-group-prepend">
                        <button
                          class="btn btn-outline-dark border-0 py-2 link-white bg-transparent"
                          type="button"
                          id="button-addon1"
                          @click="updateCart(item, item.qty - 1)"
                        >
                          <span class="material-icons-outlined"> remove </span>
                        </button>
                      </div>
                      <input
                        type="number"
                        class="form-control border-0 text-center my-auto shadow-none text-gray-200"
                        placeholder=""
                        aria-label="Example text with button addon"
                        aria-describedby="button-addon1"
                        v-model.number="item.qty"
                        @change="updateCart(item, item.qty)"
                        min="1"
                      />
                      <div class="input-group-append">
                        <button
                          class="btn btn-outline-dark border-0 py-2 link-white bg-transparent"
                          type="button"
                          id="button-addon2"
                          @click="updateCart(item, item.qty + 1)"
                        >
                          <span class="material-icons-outlined"> add </span>
                        </button>
                      </div>
                    </div>
                  </td>
                  <td class="border-0 align-middle">
                    <p class="mb-0 ms-auto">
                      {{ parseFloat(item.total.toFixed(4)) }}
                    </p>
                  </td>
                  <td class="border-0 align-middle">
                    <i class="fas fa-times"></i>
                  </td>
                </tr>
              </template>
              <tr v-else>
                <td colspan="4" class="py-4">No items</td>
              </tr>
            </tbody>
          </table>
          <div class="input-group w-50 mb-3">
            <input
              type="text"
              class="form-control rounded-0 border-bottom border-top-0 border-start-0 border-end-0 shadow-none text-gray-200"
              placeholder="coupon code"
              aria-label="Recipient's username"
              aria-describedby="button-addon2"
              v-model="couponCode"
            />
            <div class="input-group-append">
              <button
                class="btn border-bottom border-top-0 border-start-0 border-end-0 rounded-0 link-gray-200 d-flex align-items-center"
                type="button"
                id="button-addon2"
                @click="checkCoupon"
              >
                <!-- <i class="fas fa-paper-plane"></i> -->
                <span class="material-icons-outlined me-2">
                  local_activity
                </span>
                <span>Apply</span>
              </button>
            </div>
          </div>
          <!-- <router-link to="/" class="mt-5"> Continue Shopping </router-link> -->
          <div class="mt-5">
            <router-link to="/" class="link-gray-400 mt-md-0 d-flex">
              <i class="bi bi-chevron-left me-3"></i> Continue shopping
            </router-link>
          </div>
        </div>
        <div class="col-md-4">
          <div class="border p-4 mb-4 rounded-2">
            <h4 class="fw-bold mb-4">Order Detail</h4>
            <table class="table border-bottom text-gray-400">
              <tbody>
                <tr>
                  <th scope="row" class="border-0 px-0 pt-4 font-weight-normal">
                    Subtotal
                  </th>
                  <td class="text-end border-0 px-0 pt-4">
                    {{ cart.total }} ETH
                    <!-- {{ parseFloat(cart.total.toFixed(4)) }} ETH -->
                  </td>
                </tr>
                <tr v-if="hasCoupon == true">
                  <!-- <tr v-if="cart.carts[0].coupon.code"> -->
                  <th
                    scope="row"
                    class="border-0 px-0 pt-0 pb-4 font-weight-normal"
                  >
                    Coupon
                  </th>
                  <td class="text-end border-0 px-0 pt-0 pb-4">Applied</td>
                </tr>
              </tbody>
            </table>
            <div class="d-flex justify-content-between mt-4">
              <p class="mb-0 h4 fw-bold">Total</p>
              <p class="mb-0 h4 fw-bold">
                <img
                  src="../assets/images/icon/icon_eth.svg"
                  alt="ethMark"
                  class="inline-block me-2"
                />
                <span>
                  {{ cart.final_total }} ETH
                  <!-- {{ parseFloat(cart.final_total.toFixed(4)) }} ETH -->
                </span>
              </p>
            </div>

            <router-link
              to="/checkout"
              class="btn btn-primary w-100 mt-5"
              :class="{ disabled: cart.carts?.length == 0 }"
            >
              Check Out
            </router-link>
          </div>
        </div>
      </div>
      <!-- You may also like -->
    </div>
  </div>
</template>

<script>
import emitter from '../methods/emitter'

export default {
  data () {
    return {
      cart: {},
      isLoadingItem: '',
      couponCode: '',
      hasCoupon: false
    }
  },
  methods: {
    getCart () {
      this.$http
        .get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`)
        .then((res) => {
          this.cart = res.data.data
        })
        .catch((err) => {
          // console.log(err.response.data)
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
    updateCart (item, qty = 1) {
      this.isLoadingItem = item.id
      let obj = {}
      if (qty > 0) {
        obj = {
          data: {
            product_id: item.product_id,
            qty: qty
          }
        }
      } else {
        // alert('商品數量不得為 0')
        this.$swal({
          toast: true,
          position: 'bottom-end',
          icon: 'error',
          title: '商品數量不得為 0',
          showConfirmButton: false,
          showCloseButton: true,
          iconColor: '#FFBCAA',
          timer: 3000
        })
        return
      }

      this.$http
        .put(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${item.id}`,
          obj
        )
        .then((res) => {
          // alert(res.data.message)
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
          this.isLoadingItem = ''
          this.getCart()
          // Navbar 重新抓購物車資料
          emitter.emit('get-cart')
        })
        .catch((err) => {
          // console.log(err.response.data)
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
    deleteCartItem (id) {
      // const confirmDelete = confirm('Do you want to delete this item?')
      // if (confirmDelete) {
      //   ... delete API
      // }
      this.$swal({
        icon: 'warning',
        title: 'Are you sure you want to delete this?',
        showConfirmButton: true,
        confirmButtonText: 'Yes, delete it!',
        showCancelButton: true,
        showCloseButton: true,
        iconColor: '#FFBCAA',
        timer: 3000
      }).then((result) => {
        if (result.isConfirmed) {
          this.$http
            .delete(
              `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${id}`
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
              this.getCart()
              emitter.emit('get-cart')
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
            })
        }
      })
    },
    checkCoupon () {
      const obj = {
        data: {
          code: this.couponCode
        }
      }
      this.$http
        .post(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/coupon`,
          obj
        )
        .then((res) => {
          // alert(res.data.message)
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
          this.hasCoupon = true
          this.getCart()
        })
        .catch((err) => {
          // console.log(err.response.data)
          // alert(err.response.data.message)
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
    }
  },
  mounted () {
    this.getCart()
  }
}
</script>
