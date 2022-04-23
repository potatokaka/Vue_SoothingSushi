<template>
  <div class="container">
    <Loading :active="loadingOverlay"></Loading>
    <h2 class="my-3 text-gray-200">Product List</h2>
    <div class="text-end mt-4">
      <button class="btn btn-primary" type="button" @click="openModal(true)">
        Create New Product
      </button>
    </div>
    <table class="table mt-4 text-gray-200">
      <thead class="text-gray-600">
        <tr>
          <th width="120">Category</th>
          <th>Product Title</th>
          <th width="120">Origin Price</th>
          <th width="120">Price</th>
          <th width="100">Activate</th>
          <th width="200">Edit</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in products" :key="item.id">
          <td>{{ item.category }}</td>
          <td>{{ item.title }}</td>

          <td class="text-right">
            {{ $filters.currency(item.origin_price) }}
          </td>
          <td class="text-right">
            {{ $filters.currency(item.price) }}
          </td>
          <td>
            <span v-if="item.is_enabled" class="text-primary">Activated</span>
            <span v-else>Not activated</span>
          </td>
          <td>
            <div class="btn-group">
              <button
                class="btn btn-outline-primary btn-sm"
                type="button"
                @click="openModal(false, item)"
              >
                Edit
              </button>
              <button
                class="btn btn-outline-danger btn-sm"
                type="button"
                @click="openDelProductModal(item)"
              >
                Delete
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- 分頁 -->
    <Pagination :pages="pagination" @emit-pages="getAdminProducts"></Pagination>
  </div>
  <!-- Modal-新增修改 -->
  <ModalProduct
    :product-data="tempProduct"
    :is-new="isNew"
    @emit-update-product="updateProduct"
    ref="modalProduct"
  ></ModalProduct>
  <!-- Modal-刪除 -->
  <ModalDelete
    :product-data="tempProduct"
    @emit-delete-product="deleteProduct"
    ref="modalDelete"
  ></ModalDelete>
</template>

<script>
import Pagination from '@/components/Pagination.vue'
import ModalProduct from '@/components/ModalProduct.vue'
import ModalDelete from '@/components/ModalDelete.vue'

export default {
  data () {
    return {
      products: [],
      pagination: {},
      tempProduct: {},
      isNew: false,
      loadingOverlay: false
    }
  },
  components: {
    Pagination,
    ModalProduct,
    ModalDelete
  },
  methods: {
    getAdminProducts (page = 1) {
      this.loadingOverlay = true
      this.$http
        .get(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/products?page=${page}`
        )
        .then((res) => {
          this.products = res.data.products
          this.pagination = res.data.pagination
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
    updateProduct (productData) {
      // 狀態：新增產品
      let url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product`
      let httpMethod = 'post'
      // let status = '新增產品'
      // 狀態：修改產品
      if (!this.isNew) {
        url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${productData.id}`
        httpMethod = 'put'
        // status = '更新產品'
      }
      this.$http[httpMethod](url, { data: productData })
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
          this.getAdminProducts()
          this.$refs.modalProduct.closeModal()
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
    deleteProduct (id) {
      this.$http
        .delete(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${id}`
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
          this.$refs.modalDelete.closeModal()
          this.getAdminProducts()
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
    openModal (isNew, item) {
      if (isNew) {
        this.isNew = true
        this.tempProduct = {}
      } else {
        this.isNew = false
        this.tempProduct = { ...item }
      }
      this.$refs.modalProduct.openModal()
    },
    openDelProductModal (item) {
      this.$refs.modalDelete.openModal()
      this.tempProduct = item
    }
  },
  mounted () {
    this.getAdminProducts()
  }
}
</script>
