<template>
  <div class="container">
    <h2 class="my-3 text-gray-200">Order List</h2>
    <table class="table mt-4 text-gray-200">
      <thead class="text-gray-600">
        <tr>
          <th>Purchase Time</th>
          <th>Email</th>
          <th>Item</th>
          <th>Price</th>
          <th>Paid</th>
          <th>Edit</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="item in orders" :key="item.id">
          <tr v-if="orders.length" :class="{ 'text-secondary': !item.is_paid }">
            <td>{{ item.create_at }}</td>
            <td><span v-text="item.user.email" v-if="item.user"></span></td>
            <td>
              <ul class="list-unstyled">
                <li v-for="product in item.products" :key="product.id">
                  <span class="inline-block me-3">{{
                    product.product.title
                  }}</span>
                  Amount：{{ product.qty }}
                  {{ product.product.unit }}
                </li>
              </ul>
            </td>
            <td class="text-right">
              <!-- {{ item.total }} -->
              {{ $filters.currency(item.total) }}
            </td>
            <td>
              <div class="form-check form-switch">
                <input
                  class="form-check-input"
                  type="checkbox"
                  :id="`paidSwitch${item.id}`"
                  v-model="item.is_paid"
                  @change="updateOrder(item)"
                />
                <label class="form-check-label" :for="`paidSwitch${item.id}`">
                  <span v-if="item.is_paid">Paid</span>
                  <span v-else>Unpaid</span>
                </label>
              </div>
            </td>
            <td>
              <div class="btn-group">
                <button
                  class="btn btn-outline-primary btn-sm"
                  type="button"
                  @click="openOrderModal(item)"
                >
                  View
                </button>
                <button
                  class="btn btn-outline-danger btn-sm"
                  type="button"
                  @click="openDelOrderModal(item)"
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
    <!-- 分頁 -->
    <Pagination :pages="pagination" @emit-pages="getOrders"></Pagination>
  </div>
  <!-- modal-訂單 -->
  <ModalOrder
    :order-data="tempOrder"
    @emit-update-order="updateOrder"
    ref="modalOrder"
  ></ModalOrder>
  <!-- modal-刪除 -->
  <ModalDelete
    :product-data="tempOrder"
    @emit-delete-product="deleteOrder"
    ref="modalDelete"
  ></ModalDelete>
</template>

<script>
import Pagination from '@/components/Pagination.vue'
import ModalOrder from '@/components/ModalOrder.vue'
import ModalDelete from '@/components/ModalDelete.vue'

export default {
  components: {
    Pagination,
    ModalOrder,
    ModalDelete
  },
  data () {
    return {
      orders: [],
      pagination: {},
      tempOrder: {}
    }
  },
  methods: {
    getOrders (page = 1) {
      this.$http
        .get(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/orders?page=${page}`
        )
        .then((res) => {
          this.orders = res.data.orders
          this.pagination = res.data.pagination
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
    updateOrder (orderData) {
      this.$http
        .put(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/order/${orderData.id}`,
          { data: orderData }
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
          this.$refs.modalOrder.closeModal()
          this.getOrders()
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
    deleteOrder (id) {
      this.$http
        .delete(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/order/${id}`
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
          this.getOrders()
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
    openOrderModal (item) {
      this.tempOrder = { ...item }
      // console.log(this.tempOrder)
      this.$refs.modalOrder.openModal()
    },
    openDelOrderModal (item) {
      this.tempOrder = item
      this.$refs.modalDelete.openModal()
    }
  },
  mounted () {
    this.getOrders()
  }
}
</script>
