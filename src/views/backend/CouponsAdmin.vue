<template>
  <div class="container">
    <h2 class="mt-3 text-gray-200">Coupon List</h2>
    <div class="text-end mt-4">
      <button
        class="btn btn-primary"
        type="button"
        @click="openCouponModal(true)"
      >
        Create new coupon
      </button>
    </div>
    <table class="table mt-4 text-gray-200">
      <thead class="text-gray-600">
        <tr>
          <th>Couple Title</th>
          <th>Discount %</th>
          <th>Due date</th>
          <th>Activate</th>
          <th>Edit</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in coupons" :key="`${item.title} + ${index}`">
          <td>{{ item.title }}</td>
          <td>{{ item.percent }}%</td>
          <td>
            {{ $filters.date(item.due_date) }}
          </td>
          <td>
            <span v-if="item.is_enabled === 1" class="text-primary"
              >Activated</span
            >
            <span v-else class="text-muted">Not activated</span>
          </td>
          <td>
            <div class="btn-group">
              <button
                class="btn btn-outline-primary btn-sm"
                @click="openCouponModal(false, item)"
              >
                Edit
              </button>
              <button
                class="btn btn-outline-danger btn-sm"
                @click="openDelCouponModal(item)"
              >
                Delete
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- 分頁 -->
    <Pagination :pages="pagination"></Pagination>
    <!-- modal 新增修改 -->
    <ModalCoupon
      :coupon-data="tempCoupon"
      :is-new="isNew"
      @emit-update-coupon="updateCoupon"
      ref="modalCoupon"
    ></ModalCoupon>
    <!-- modal 刪除 -->
    <ModalDelete
      :product-data="tempCoupon"
      @emit-delete-product="deleteCoupon"
      ref="modalDelete"
    ></ModalDelete>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue'
import ModalCoupon from '@/components/ModalCoupon.vue'
import ModalDelete from '@/components/ModalDelete.vue'

export default {
  components: {
    Pagination,
    ModalCoupon,
    ModalDelete
  },
  data () {
    return {
      coupons: [],
      pagination: {},
      tempCoupon: {},
      isNew: false
    }
  },
  methods: {
    getCoupons (page = 1) {
      this.$http
        .get(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupons?page=${page}`
        )
        .then((res) => {
          this.coupons = res.data.coupons
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
    updateCoupon (item) {
      // 新增狀態
      let url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon`
      let httpMethod = 'post'
      // 修改狀態
      if (!this.isNew) {
        url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon/${item.id}`
        httpMethod = 'put'
      }
      this.$http[httpMethod](url, { data: item })
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
          this.getCoupons()
          this.$refs.modalCoupon.closeModal()
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
    deleteCoupon (id) {
      this.$http
        .delete(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon/${id}`
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
          this.getCoupons()
          this.$refs.modalDelete.closeModal()
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
    openCouponModal (isNew, item) {
      if (isNew) {
        // 新增狀態
        this.tempCoupon = {
          // 預先設定 due_date 為當前時間(10位數 Timestamp)
          due_date: new Date().getTime() / 1000
        }
        this.isNew = true
      } else {
        // 修改狀態
        this.tempCoupon = { ...item }
        this.isNew = false
      }
      this.$refs.modalCoupon.openModal()
    },
    openDelCouponModal (item) {
      this.tempCoupon = item
      this.$refs.modalDelete.openModal()
    }
  },
  mounted () {
    this.getCoupons()
  }
}
</script>
