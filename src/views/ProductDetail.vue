<template>
  <div class="container text-gray-400 pt-8 position-relative">
    <div class="row mt-8 mb-7">
      <div class="offset-lg-1 col-lg-6">
        <Atropos
          class="my-atropos"
          :active-offset="40"
          :shadow="false"
          :highlight="false"
          :shadow-scale="1.05"
          :rotateXMax="20"
          :rotateYMax="20"
        >
          <img
            :src="product.imageUrl"
            data-atropos-offset="-5"
            class="w-100"
            :alt="product.title"
          />
        </Atropos>
        <!-- Accordion -->
        <div
          class="accordion border border-bottom border-top-0 border-start-0 border-end-0 mt-5"
          id="accordionExample"
        >
          <div class="card border-0 bg-transparent">
            <div
              class="card-header py-4 border border-bottom-0 border-top border-start-0 border-end-0 cursor-pointer"
              id="headingOne"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
            >
              <div
                class="d-flex justify-content-between align-items-center pe-1"
              >
                <h4 class="mb-0">What is an NFT?</h4>
                <span class="material-icons-outlined"> add </span>
              </div>
            </div>
            <div
              id="collapseOne"
              class="collapse show"
              aria-labelledby="headingOne"
              data-bs-parent="#accordionExample"
            >
              <div class="card-body pb-5 text-gray-500">
                An NFT is a digital collectible. A non-fungible token (NFT) is a
                digital certificate of ownership built on blockchain technology,
                that contains the provenance, the history, and all activities
                surrounding a digital asset.
              </div>
            </div>
          </div>
          <div class="card border-0 bg-transparent">
            <div
              class="card-header py-4 border border-bottom-0 border-top border-start-0 border-end-0 cursor-pointer"
              id="headingTwo"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
            >
              <div
                class="d-flex justify-content-between align-items-center pe-1"
              >
                <h4 class="mb-0">What can I get from this NFT?</h4>
                <span class="material-icons-outlined"> add </span>
              </div>
            </div>
            <div
              id="collapseTwo"
              class="collapse"
              aria-labelledby="headingTwo"
              data-bs-parent="#accordionExample"
            >
              <div class="card-body pb-5">
                With this NFT certificate, you can enjoy the priority
                reservation in our Soothing Sushi bars and all-you-can-eat-
                sushi, accouding to your NFT pack. Also, you’ll get special
                members-only privileges such as unique airdrops, limited-edition
                servings from our Soothing Sushi bar. These benefits are
                exclusively limited to Soothing Sushi exclusive Club members.
              </div>
            </div>
          </div>
          <div class="card border-0 bg-transparent">
            <div
              class="card-header py-4 border border-bottom-0 border-top border-start-0 border-end-0 cursor-pointer"
              id="headingThree"
              data-bs-toggle="collapse"
              data-bs-target="#collapseThree"
            >
              <div
                class="d-flex justify-content-between align-items-center pe-1"
              >
                <h4 class="mb-0">What are the payment options?</h4>
                <span class="material-icons-outlined"> add </span>
              </div>
            </div>
            <div
              id="collapseThree"
              class="collapse"
              aria-labelledby="headingThree"
              data-bs-parent="#accordionExample"
            >
              <div class="card-body pb-5 text-gray-400 text-gray-500">
                You get to choose - debit card, credit card, Gemini Balance,
                prepaid ETH - all without the hassle of signing transactions and
                calculating gas fees.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-4 position-sticky top-0">
        <h1 class="mb-0">{{ product.title }}</h1>
        <p class="mt-3">
          {{ product.description }}
        </p>
        <p class="d-flex mt-3">
          <img
            src="../assets/images/icon/icon_eth.svg"
            alt="ethMark"
            class="inline-block me-3"
          />
          <span class="text-primary fs-4 ff-mont"
            >{{ product.price }} {{ product.unit }}</span
          >
        </p>
        <div class="input-group mb-3 border mt-3 rounded-3">
          <div class="input-group-prepend">
            <button
              class="btn rounded-0 border-0 py-3 link-white bg-transparent"
              type="button"
              id="button-addon1"
              @click="
                () => {
                  if (qty > 1) {
                    qty--
                  }
                }
              "
            >
              <!-- <i class="fas fa-minus"></i> -->
              <span class="material-icons-outlined"> remove </span>
            </button>
          </div>
          <input
            type="number"
            class="form-control border-0 text-center my-auto shadow-none text-white"
            placeholder=""
            aria-label="Example text with button addon"
            aria-describedby="button-addon1"
            v-model.number="qty"
            min="0"
            max="10"
          />
          <div class="input-group-append">
            <button
              class="btn btn-outline-dark rounded-0 border-0 py-3 link-white bg-transparent"
              type="button"
              id="button-addon2"
              @click="qty++"
            >
              <!-- <i class="fas fa-plus"></i> -->
              <span class="material-icons-outlined"> add </span>
            </button>
          </div>
        </div>
        <button
          href="./checkout.html"
          type="button"
          class="btn btn-primary btn-block h-btn-lg w-100"
          :disabled="isLoadingItem === product.id"
          @click="addToCart(product.id)"
        >
          <span
            class="spinner-grow spinner-grow-sm"
            v-if="isLoadingItem === product.id"
          ></span>
          <span class="material-icons-outlined mt-1" v-else>
            shopping_cart
          </span>
        </button>
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
      product: {},
      qty: 1,
      isLoadingItem: ''
    }
  },
  components: {
    Atropos
  },
  methods: {
    getProduct () {
      const { id } = this.$route.params
      this.$http
        .get(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/product/${id}`
        )
        .then((res) => {
          this.product = res.data.product
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
    addToCart (id, qty = 1) {
      this.isLoadingItem = id
      const obj = {
        data: {
          product_id: id,
          qty: this.qty
        }
      }
      this.$http
        .post(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`,
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
    this.getProduct()
  }
}
</script>
