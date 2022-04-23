<template>
  <div class="container">
    <div class="row justify-content-center vh-100">
      <div class="col-4">
        <div class="text-center mt-7 mb-5">
          <img
            class="logo-header"
            src="../assets/images/logo_getSoothing_01.svg"
            alt="logo"
          />
        </div>
        <h2 class="text-center text-gray-200">Login</h2>
        <Form v-slot="{ errors }" @submit="login">
          <div class="form-group mb-4">
            <label for="inputEmail" class="text-gray-200">Email address</label>
            <Field
              type="email"
              name="email"
              class="form-control text-gray-200"
              :class="{ 'is-invalid': errors['email'] }"
              id="inputEmail"
              aria-describedby="Email address"
              placeholder="Enter email"
              required
              autofocus
              v-model="user.username"
              rules="email|required"
            ></Field>
            <ErrorMessage name="email" class="invalid-feedback"></ErrorMessage>
          </div>
          <div class="form-group">
            <label for="inputPassword" class="text-gray-200">Password</label>
            <Field
              type="password"
              name="password"
              class="form-control text-gray-200"
              :class="{ 'is-invalid': errors['password'] }"
              id="inputPassword"
              placeholder="Password"
              required
              v-model="user.password"
              :rules="isPassword"
            ></Field>
            <ErrorMessage
              class="invalid-feedback"
              name="password"
            ></ErrorMessage>
          </div>

          <button type="submit" class="btn btn-primary w-100 mt-3">
            Submit
          </button>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
import emitter from '@/methods/emitter.js'
export default {
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      this.$http
        .post(`${process.env.VUE_APP_API}/admin/signin`, this.user)
        .then((res) => {
          const { token, expired } = res.data
          document.cookie = `hexToken=${token}; expires=${new Date(expired)}`
          // emitter login 狀態
          emitter.emit('is-login')
          this.$router.push('/admin')
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
    // Vee Validate 密碼規則
    isPassword (value) {
      const password = /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{8,}$/
      return password.test(value)
        ? true
        : 'password should contain uppercase letters, lowercase letters and numbers.'
    }
  }
}
</script>
