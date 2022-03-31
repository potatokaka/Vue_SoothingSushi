<template>
  <div class="container pt-8 text-gray-200">
    <div class="pt-5 pb-7 mt-8">
      <div class="container">
        <div class="row justify-content-center flex-md-row flex-column-reverse">
          <div class="col-md-6">
            <h2>Checkout</h2>
            <div class="p-4">
              <h4 class="fw-bold">1. Contact Form</h4>
              <p class="mt-4">Contact information</p>
              <Form ref="form" v-slot="{ errors }" @submit="createOrder">
                <div class="mb-3">
                  <label for="emailInput" class="text-muted mb-0 form-label"
                    >Email</label
                  >
                  <Field
                    id="emailInput"
                    name="email"
                    type="email"
                    class="form-control rounded-0 text-gray-200"
                    :class="{ 'is-invalid': errors['email'] }"
                    aria-describedby="emailHelp"
                    placeholder="example@gmail.com"
                    rules="email|required"
                    v-model="form.user.email"
                  >
                  </Field>
                  <error-message
                    name="email"
                    class="invalid-feedback"
                  ></error-message>
                </div>

                <div class="mb-3">
                  <label for="ContactName" class="text-muted mb-0 form-label"
                    >Name</label
                  >
                  <Field
                    id="ContactName"
                    name="ContactName"
                    type="text"
                    class="form-control rounded-0 text-gray-200"
                    :class="{ 'is-invalid': errors['ContactName'] }"
                    aria-describedby="nameInputHelp"
                    placeholder="Please fill in your full name"
                    rules="required"
                    v-model="form.user.name"
                  >
                  </Field>
                  <error-message
                    name="contactName"
                    class="invalid-feedback"
                  ></error-message>
                </div>

                <div class="mb-3">
                  <label for="ContactPhone" class="text-muted mb-0 form-label"
                    >Phone</label
                  >
                  <Field
                    id="ContactPhone"
                    name="ContactPhone"
                    type="tel"
                    class="form-control rounded-0 text-gray-200"
                    :class="{ 'is-invalid': errors['ContactPhone'] }"
                    aria-describedby="phoneInputHelp"
                    placeholder="ex. 0933123123"
                    :rules="isPhone"
                    v-model="form.user.tel"
                  >
                  </Field>
                  <error-message
                    name="ContactPhone"
                    class="invalid-feedback"
                  ></error-message>
                </div>

                <h4 class="fw-bold mt-5">2. Shipping Form</h4>
                <p class="mt-4 mb-3">Shipping address</p>
                <div class="form-row">
                  <div class="col mb-3">
                    <select
                      id="inputState"
                      class="form-select rounded-0 text-gray-200"
                    >
                      <option selected>Country/Region</option>
                      <option>...</option>
                    </select>
                  </div>
                  <div class="col mb-3">
                    <select
                      id="inputState"
                      class="form-select rounded-0 text-gray-200"
                    >
                      <option selected>City</option>
                      <option>...</option>
                    </select>
                  </div>
                </div>
                <div>
                  <!-- <input
                    type="text"
                    class="form-control rounded-0 mt-1 text-gray-200"
                    id="inputCity"
                    placeholder="Address"
                    v-model="form.user.address"
                  /> -->
                  <Field
                    id="ContactAddress"
                    name="ContactAddress"
                    type="text"
                    class="form-control rounded-0 text-gray-200"
                    :class="{ 'is-invalid': errors['ContactAddress'] }"
                    aria-describedby="addressInputHelp"
                    placeholder="Please fill in your Address"
                    rules="required"
                    v-model="form.user.address"
                  >
                  </Field>
                  <error-message
                    name="ContactPhone"
                    class="invalid-feedback"
                  ></error-message>
                </div>
                <p class="mt-4 mb-3">Payment</p>
                <div class="form-check mb-3">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="paymendMethod"
                    id="paymendMethod1"
                    value="credit Card"
                    v-model="paymentMethod"
                    checked
                  />
                  <label class="form-check-label" for="paymendMethod1"
                    >Credit Card
                  </label>
                </div>
                <div class="form-check mb-3">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="paymendMethod"
                    id="paymendMethod2"
                    v-model="paymentMethod"
                    value="Pay Pal"
                  />
                  <label class="form-check-label" for="paymendMethod2"
                    >Pay Pal
                  </label>
                </div>
                <div class="form-check mb-3">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="paymendMethod"
                    id="paymendMethod3"
                    v-model="paymentMethod"
                    value="ApplePay"
                  />
                  <label class="form-check-label" for="gridRadios3"
                    >ApplePay
                  </label>
                </div>
                <div
                  class="d-flex flex-column-reverse flex-md-row mt-4 justify-content-between align-items-md-center align-items-end w-100"
                >
                  <router-link
                    to="/cart"
                    class="link-gray-400 mt-md-0 mt-3 d-flex"
                  >
                    <i class="bi bi-chevron-left me-3"></i> go back
                  </router-link>
                  <button
                    href="./checkout-success.html"
                    class="btn btn-primary py-3 px-7 rounded-0"
                    type="submit"
                    :disabled="
                      cart.carts?.length === 0 || Object.keys(errors).length > 0
                    "
                  >
                    Send
                  </button>
                </div>
              </Form>
            </div>
          </div>
          <sidebar class="col-md-4">
            <div class="border p-4 mb-4">
              <h4 class="mb-4">Order Detail</h4>
              <div
                class="d-flex mb-4"
                v-for="item in cart.carts"
                :key="item.product.id"
              >
                <img
                  :src="item.product.imageUrl"
                  alt="item.product.title"
                  class="me-2"
                  style="width: 48px; height: 48px; object-fit: cover"
                />
                <div class="w-100">
                  <div class="d-flex justify-content-between fw-bold">
                    <p class="mb-0">{{ item.product.title }}</p>
                    <p class="mb-0">{{ item.qty }}</p>
                  </div>
                  <div class="d-flex justify-content-between">
                    <p class="text-muted mb-0">
                      <small>{{ item.total }}</small>
                    </p>
                    <p class="mb-0">{{ item.final_total }} ETH</p>
                  </div>
                </div>
              </div>
              <table class="table mt-4 border-top border-bottom text-muted">
                <tbody>
                  <tr>
                    <th
                      scope="row"
                      class="border-0 px-0 pt-4 font-weight-normal"
                    >
                      Subtotal
                    </th>
                    <td class="text-end border-0 px-0 pt-4">
                      {{ cart.total }}
                    </td>
                  </tr>
                  <tr>
                    <th
                      scope="row"
                      class="border-0 px-0 pt-0 pb-4 font-weight-normal"
                    >
                      Payment
                    </th>
                    <td class="text-end border-0 px-0 pt-0 pb-4">
                      {{ paymentMethod }}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="d-flex justify-content-between mt-4">
                <p class="mb-0 h4 fw-bold">Total</p>
                <p class="mb-0 h4 fw-bold">{{ cart.final_total }} ETH</p>
              </div>
            </div>
          </sidebar>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import emitter from '../methods/emitter'

export default {
  data () {
    return {
      cart: {},
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      },
      paymentMethod: 'creditCard'
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
    },
    createOrder () {
      this.$http
        .post(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order`,
          { data: this.form }
        )
        .then((res) => {
          alert(res.data.message)
          // console.log(res.data)
          emitter.emit('get-cart')
          this.$refs.form.resetForm() // 表單清空
          this.$router.push('/checkoutSuccess') // 跳至結帳成功頁
        })
        .catch((err) => {
          alert(err.response.data.message)
          // console.log(err.response.data)
        })
    },
    // Vee Validate 手機規則
    isPhone (value) {
      const phoneNumber = /^(09)[0-9]{8}$/
      return phoneNumber.test(value)
        ? true
        : 'Please fill in valid mobile number'
    }
  },
  mounted () {
    this.getCart()
  }
}
</script>
