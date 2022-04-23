<template>
  <nav
    class="navbar navbar-expand-lg navbar-light justify-content-center border border-start-0 border-end-0 border-top border-bottom mt-8"
  >
    <div class="navbar-nav flex-row overflow-auto navbar-custom-scroll">
      <a
        class="nav-item nav-link text-nowrap px-4 link-white"
        href="#"
        @click.prevent="emitAllView"
        >All</a
      >
      <a
        class="nav-item nav-link text-nowrap px-4 link-white"
        href="#"
        v-for="(item, index) in tempCategories"
        :key="JSON.stringify(item - index)"
        @click.prevent="emitFilteredView(item)"
        >{{ item }}</a
      >
    </div>
  </nav>
</template>

<script>
export default {
  props: ['categories'],
  data () {
    return {
      tempCategories: []
    }
  },
  watch: {
    categories () {
      this.tempCategories = this.categories
    }
  },
  methods: {
    emitAllView () {
      this.$emit('emitAllView')
    },
    emitFilteredView (item) {
      this.$emit('emitFilteredView', item)
    }
  }
}
</script>
