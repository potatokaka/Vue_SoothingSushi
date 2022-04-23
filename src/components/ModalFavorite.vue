<template>
  <div class="modalFavorite">
    <ul class="favoriteWrapper">
      <template v-if="myFavorite.length > 0">
        <li
          v-for="item in favProducts"
          :key="item.id"
          class="d-flex text-dark align-items-center py-2"
        >
          <button
            class="btn btn-outline-dark border-0 me-1 link-white bg-transparent"
            type="button"
            id="button-addon1"
            @click="updateMyFavorite(item.id)"
          >
            <span class="material-icons-outlined"> clear </span>
          </button>
          <img
            class="me-2"
            :src="item.imageUrl"
            :alt="item.title"
            style="width: 100px"
          />

          <div class="flex-shrink-0 me-4">
            <h3 class="h5">{{ item.title }}</h3>
            <p class="h8">{{ item.price }}</p>
          </div>
        </li>
      </template>
      <li v-else class="d-flex text-dark align-items-center px-5 py-4">
        <h3 class="h5">No favorite items, please add your favs 🥺</h3>
      </li>
      <button
        class="btn btn-transparent text-end w-100 px-4 py-3"
        @click="emitToggleModal"
      >
        close
      </button>
    </ul>
  </div>
</template>

<script>
import emitter from '../methods/emitter'
import localStorage from '../mixins/localStorage'

export default {
  // props: ['isFavOpen'],
  mixins: [localStorage],
  data () {
    return {
      products: [],
      favProducts: []
    }
  },
  methods: {
    getProducts () {
      this.$http
        .get(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products`
        )
        .then((res) => {
          this.products = res.data.products.sort((a, b) => a.price - b.price)
          this.getFavProducts()
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
    },
    getFavProducts () {
      if (this.myFavorite.length > 0) {
        this.favProducts = this.products.filter((element) =>
          this.myFavorite.includes(element.id)
        )
      }
    },
    // 觸發 emit ，在 NavbarFront 執行 toggle fn
    emitToggleModal () {
      this.$emit('emit-toggle-modal')
    }
  },
  mounted () {
    this.getProducts()
    // 監聽-我的最愛
    emitter.on('update-favorite', () => {
      this.getProducts()
    })
  }
}
</script>
