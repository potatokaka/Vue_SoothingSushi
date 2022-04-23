<template>
  <AdminNavbar />
  <RouterView />
</template>

<script>
import AdminNavbar from '@/components/backend/AdminNavbar.vue'
export default {
  name: 'Dashboard',
  components: {
    AdminNavbar
  },
  data () {
    return {
      checkSuccess: false
    }
  },
  methods: {
    checkLogin () {
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
        '$1'
      )
      this.$http.defaults.headers.common.Authorization = token

      this.$http
        .post(`${process.env.VUE_APP_API}/api/user/check`)
        .then((res) => {
          this.checkSuccess = true
          this.$swal({
            toast: true,
            position: 'bottom-end',
            icon: 'success',
            title: '登入成功',
            showConfirmButton: false,
            showCloseButton: true,
            iconColor: '#FFBCAA',
            timer: 3000
          })
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
          this.$router.push('/login')
        })
    }
  },
  mounted () {
    this.checkLogin()
  }
}
</script>
