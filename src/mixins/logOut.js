export default {
  methods: {
    logOut () {
      document.cookie = 'hexToken=""; expires=""'
      this.$swal({
        toast: true,
        position: 'bottom-end',
        icon: 'success',
        title: '已清除 Token',
        showConfirmButton: false,
        showCloseButton: true,
        iconColor: '#FFBCAA',
        timer: 3000
      })
      this.$router.push('/login')
    }
  }
}
