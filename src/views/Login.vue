<template>
        <div class="row justify-content-center">
            <div class="col-lg-5 col-md-7">
                <div class="card bg-secondary shadow border-0">
                    
                    <div class="card-body px-lg-5 py-lg-5">
                        <div class="text-center text-muted mb-4">
                            <h1>Login</h1>
                        </div>
                        <form role="form">
                            <base-input class="input-group-alternative mb-3"
                                        placeholder="Email"
                                        autofocus
                                        addon-left-icon="ni ni-email-83"
                                        v-model="model.email">
                            </base-input>

                            <base-input class="input-group-alternative"
                                        placeholder="Password"
                                        type="password"
                                        
                                        addon-left-icon="ni ni-lock-circle-open"
                                        v-model="model.password"
                                        v-on:keyup.13="loginWithKey"
                                        >
                                        
                            </base-input>

                            
                            <div class="text-center">
                                <base-button type="primary" @click="loginPelanggan"  class="my-4"> <span id="login">Login</span><span  id="loader" style="display:none"><pulse-loader :loading="loading" :color="color" :size="size"></pulse-loader></span> </base-button>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-6">
                       
                    </div>
                    <div class="col-6 text-right">
                        <router-link to="/register" class="text-light"><small>Create new account</small></router-link>
                    </div>
                </div>
            </div>
        </div>
</template>
<script>
import axios from 'axios'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import SyncLoader from 'vue-spinner/src/SyncLoader.vue'

  export default {
    name: 'login',
    data() {
      return {
        model: {
          email: '',
          password: '',
         
        },
        loading : true,
        color: 'white',
        size: '10px'
      }
    },
    components:{
      PulseLoader,
      SyncLoader
    },
    methods : {
      loginWithKey(){
        let login = document.getElementById('login')
        let loader = document.getElementById('loader')
        login.style.display = 'none'
        loader.style.display = "block"

        if(this.model.email == '' || this.model.password == ''){
          this.$swal({
            icon : 'error',
            title : 'Login Gagal !',
            text : 'Data Tidak Boleh Kosong'
          })
          loader.style.display = 'none'
          login.style.display = 'block'
        }else{
          setTimeout(() => {
            axios.post('http://localhost:1000/login_pelanggan', this.model)
            .then(response => {
              // console.log(response)
              let token = response.data.token
              let user = response.data.data.user
              let id_user = response.data.data.id_user
              
            
              localStorage.setItem('token', token)
              localStorage.setItem('user', user)
              localStorage.setItem('id_user', id_user)
  
              this.$swal({
                icon : 'success',
                title : 'Login',
                text : 'Login Success'
              })
              .then(result => {
                if(result.value){
                  this.$router.push('/')
  
                }
              })
            })
            .catch(err => {
              
              this.$swal({
                icon : 'error',
                title : 'Login',
                text : 'Login Gagal'
              })
              loader.style.display = 'none'
              login.style.display = 'block'
            })
          }, 4000)

        } 
      },
      loginPelanggan(){
        
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
            axios.post('http://localhost:1000/login_pelanggan', this.model)
            .then(response => {
              // console.log(response)
              let token = response.data.token
              let user = response.data.data.user
              
            
              localStorage.setItem('token', token)
              localStorage.setItem('user', user)
              this.$swal({
                icon : 'success',
                title : 'Login',
                text : 'Login Success'
              })
              .then(result => {
                if(result.value){
                  this.$router.push('/')
  
                }
              })
            })
            .catch(err => {
              
              this.$swal({
                icon : 'error',
                title : 'Login',
                text : 'Login Gagal'
              })
              loader.style.display = 'none'
              login.style.display = 'block'
            })
          }, 4000)

        }

        
        
      }
    }
  }
</script>
<style>
</style>
