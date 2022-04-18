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
                  <ErrorMessage
                    name="email"
                    class="invalid-feedback"
                  ></ErrorMessage>
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
                  <ErrorMessage
                    name="contactName"
                    class="invalid-feedback"
                  ></ErrorMessage>
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
                  <ErrorMessage
                    name="ContactPhone"
                    class="invalid-feedback"
                  ></ErrorMessage>
                </div>

                <h4 class="fw-bold mt-5">2. Shipping Form</h4>
                <p class="mt-4 mb-3">Shipping address</p>
                <div class="form-row">
                  <div class="col mb-3">
                    <select
                      id="cityName"
                      class="form-select rounded-0 text-gray-200"
                      v-model="selectAddress.city"
                    >
                      <option value="">請選擇縣市</option>
                      <option
                        :value="c.CityName"
                        v-for="c in cityName"
                        :key="c.CityName"
                      >
                        {{ c.CityName }}
                      </option>
                    </select>
                  </div>
                  <div class="col mb-3">
                    <select
                      id="area"
                      class="form-select rounded-0 text-gray-200"
                      v-model="selectAddress.area"
                    >
                      <option value="">請選擇地區</option>
                      <option
                        :value="a.AreaName"
                        v-for="a in cityName.find(
                          (city) => city.CityName === selectAddress.city
                        ).AreaList"
                        :key="a.AreaName"
                      >
                        {{ a.AreaName }}
                      </option>
                    </select>
                  </div>
                </div>
                <div>
                  <Field
                    id="ContactAddress"
                    name="ContactAddress"
                    type="text"
                    class="form-control rounded-0 text-gray-200"
                    :class="{ 'is-invalid': errors['ContactAddress'] }"
                    aria-describedby="addressInputHelp"
                    placeholder="Please fill in your Address"
                    rules="required"
                    v-model="selectAddress.address"
                  >
                  </Field>
                  <ErrorMessage
                    name="ContactPhone"
                    class="invalid-feedback"
                  ></ErrorMessage>
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
                    class="btn btn-primary py-3 px-7 rounded-0 w-btn-lg"
                    type="submit"
                    :disabled="
                      cart.carts?.length === 0 || Object.keys(errors).length > 0
                    "
                  >
                    <span
                      class="spinner-grow spinner-grow-sm"
                      v-if="isLoadingItem === true"
                    ></span>
                    <span v-else>Send</span>
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
                  :alt="item.product.title"
                  class="me-2 h-cart-checkout-img object-fit"
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
import cityName from '../assets/cityName.json'

export default {
  data () {
    return {
      cart: {},
      form: {
        user: {
          name: '',
          email: '',
          tel: ''
          // address: ''
        },
        message: ''
      },
      cityName,
      selectAddress: {
        city: '臺北市',
        area: '中正區',
        address: ''
      },
      paymentMethod: 'creditCard',
      isLoadingItem: false
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
    createOrder () {
      this.isLoadingItem = true
      this.form.user.address = `${this.selectAddress.city}${this.selectAddress.area}${this.selectAddress.address}`
      this.$http
        .post(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order`,
          { data: this.form }
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
          emitter.emit('get-cart')
          this.isLoadingItem = false
          this.$refs.form.resetForm() // 表單清空
          this.$router.push('/checkoutSuccess') // 跳至結帳成功頁
        })
        .catch((err) => {
          // alert(err.response.data.message)
          this.isLoadingItem = false
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
