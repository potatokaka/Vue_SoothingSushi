import emitter from '../methods/emitter'

export default {
  data () {
    return {
      myFavorite: this.getLocalStorage() || []
    }
  },
  methods: {
    saveLocalStorage (favorite) {
      const favoriteString = JSON.stringify(favorite)
      localStorage.setItem('customFavorite', favoriteString)
    },
    getLocalStorage () {
      return JSON.parse(localStorage.getItem('customFavorite'))
    },
    updateMyFavorite (id) {
      if (this.myFavorite.includes(id)) {
        this.myFavorite.splice(this.myFavorite.indexOf(id), 1)
        this.$swal({
          toast: true,
          position: 'bottom-end',
          icon: 'success',
          title: 'Item removed from your fav!',
          showConfirmButton: false,
          showCloseButton: true,
          iconColor: '#FFBCAA',
          timer: 3000
        })
      } else {
        this.myFavorite.push(id)
        this.$swal({
          toast: true,
          position: 'bottom-end',
          icon: 'success',
          title: 'Item added to your fav!',
          showConfirmButton: false,
          showCloseButton: true,
          iconColor: '#e8584d',
          timer: 3000
        })
      }
      this.saveLocalStorage(this.myFavorite)
      // 觸發 Navbar 更新
      emitter.emit('update-favorite')
    }
  },
  mounted () {
    // 監聽-我的最愛
    emitter.on('update-favorite', () => {
      this.myFavorite = this.getLocalStorage()
    })
  }
}
