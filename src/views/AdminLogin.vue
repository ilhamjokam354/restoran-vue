<template>
        <div class="row justify-content-center">
            <div class="col-lg-5 col-md-7">
                <div class="card bg-secondary shadow border-0">
                    
                    <div class="card-body px-lg-5 py-lg-5">
                        <div class="text-center text-muted mb-4">
                            <h1>Login Admin</h1>
                        </div>
                        <form role="form">
                            <base-input class="input-group-alternative mb-3"
                                        placeholder="Email"
                                        autofocus
                                        type="email"
                                        addon-left-icon="ni ni-email-83"
                                        required
                                        v-model="model.email">

                            </base-input>

                            <base-input class="input-group-alternative"
                                        placeholder="Password"
                                        type="password"
                                        required
                                        addon-left-icon="ni ni-lock-circle-open"
                                        v-model="model.password"
                                        v-on:keyup.13="loginWithKey">
                            </base-input>

                            
                            <div class="text-center">
                                <base-button  type="primary" class="my-4" @click="loginAdmin"><span id="login">Login</span><span  id="loader" style="display:none"><pulse-loader :loading="loading" :color="color" :size="size"></pulse-loader></span></base-button>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-6">
                       
                    </div>
                    
                </div>
            </div>
        </div>
</template>
<script>
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import axios from 'axios'
  export default {
    name: 'login',
    data() {
      return {
        model: {
          email: '',
          password: ''
        },
        loading : true,
        color: 'white',
        size: '10px'
      }
    },
    components : {
      PulseLoader
    },
    methods : {
      loginWithKey(){
        this.loginAdmin()
      },
      loginAdmin(){
        let login = document.getElementById('login')
        let loader = document.getElementById('loader')
        login.style.display = 'none'
        loader.style.display = "block"
        if(this.model.email == '' || this.model.password == ''){
          this.$swal({
            icon : 'error',
            title : 'Login',
            text : 'Login Gagal'
          })
          loader.style.display = 'none'
          login.style.display = 'block'
        }else{
          setTimeout(() => {
            axios.post('http://localhost:1000/login', this.model)
              .then(response => {
                // console.log(response)
    
                this.$swal({
                  icon : 'success',
                  title : 'Login !',
                  text : 'Login Success'
                })
                .then(result => {
                  if(result.value){
                    let token = response.data.token
                    let level = response.data.data.level
                    let user = response.data.data.user
                    localStorage.setItem('level', level)
                    localStorage.setItem('user', user)
                    localStorage.setItem('token', token)
                    if(level == 'kasir'){
                      this.$router.push('/admin/order')
                    }else{
                      this.$router.push('/dashboard/admin')

                    }
                  }
                })
                
            
              })
              .catch(err => {
                // console.log(err)
                this.$swal({
                  icon : 'error',
                  title : 'Login',
                  text : 'Maaf Anda Bukan Admin'
                })
                this.model.email = ''
                this.model.password = ''
                loader.style.display = 'none'
                login.style.display = 'block'
              })

          }, 3000)
        }
          
      }
    }
  }
</script>
<style>
</style>
