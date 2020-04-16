<template>
    <div class="row justify-content-center">
        <div class="col-lg-5 col-md-7">
            <div class="card bg-secondary shadow border-0">
                
                <div class="card-body px-lg-5 py-lg-5">
                    <div class="text-center text-muted mb-4">
                        <h1>Registrasi</h1>
                    </div>
                    <form role="form" >

                        <base-input class="input-group-alternative mb-3"
                                    placeholder="Username"
                                    autofocus
                                    addon-left-icon="ni ni-circle-08"
                                    v-model="model.user">
                        </base-input>

                        <base-input class="input-group-alternative mb-3"
                                    placeholder="Alamat"
                                    addon-left-icon="ni ni-square-pin"
                                    v-model="model.alamat">
                        </base-input>

                        <base-input class="input-group-alternative mb-3"
                                    placeholder="Telepon"
                                    addon-left-icon="ni ni-tablet-button"
                                    v-model="model.telepon">
                        </base-input>

                        <base-input class="input-group-alternative mb-3"
                                    placeholder="Email"
                                    addon-left-icon="ni ni-email-83"
                                    v-model="model.email">
                        </base-input>

                        <base-input class="input-group-alternative"
                                    placeholder="Password"
                                    type="password"
                                    addon-left-icon="ni ni-lock-circle-open"
                                    v-model="model.password"
                                    v-on:keyup.13="registerWithKey"
                                    >
                        </base-input>

                        
                        

                        <div class="row my-4">
                            
                        </div>
                        <div class="text-center">
                            <base-button type="primary" @click="registerPelanggan" class="my-4"><span id="reg">Create Account</span><span  id="loader" style="display:none"><pulse-loader :loading="loading" :color="color" :size="size"></pulse-loader></span> </base-button>
                        </div>
                    </form>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-6">
                    <a href="#" class="text-light">
                        
                    </a>
                </div>
                <div class="col-6 text-right">
                    <router-link to="/login" class="text-light">
                        <small>Login into your account</small>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
  export default {
    name: 'register',
    data() {
      return {
        model: {
            user: '',
            alamat : '',
            telepon : '',
            email: '',
            password: '',
            api_token : '',
            aktif : '',
            
        },
        loading : true,
        color: 'white',
        size: '10px',
        
      }
    },
    components : {
        PulseLoader
    },
    methods : {
        registerWithKey(){
            this.registerPelanggan()
        },
        registerPelanggan(){
            let reg = document.getElementById('reg')
            let loader = document.getElementById('loader')
            reg.style.display = 'none'
            loader.style.display = "block"
            if(this.model.user == '' || this.model.alamat == '' || this.model.telepon == '' || this.model.email == '' || this.model.password == ''){
                this.$swal({
                    icon : 'error',
                    title : 'Register Gagal !',
                    text : 'Data Tidak Boleh Kosong'
                })
                loader.style.display = 'none'
                reg.style.display = 'block'
            }
            else{
                setTimeout(() => {
                    axios.post('http://localhost:1000/register_pelanggan', this.model)
                    .then(response => {
                        this.$swal({
                            icon : 'success',
                            title : 'Registrasi',
                            text : response.data.message + ' Silahkan Login'
        
                        })
                        .then(result => {
                            if(result.value){
                                this.$router.push('/login')
        
                            }
                        })
                    })
                    .catch(err => {
                        this.$swal({
                            icon : 'error',
                            title : 'Registrasi',
                            text : response.data.message
                        })
                    })

                }, 3000)    
            }
        }
    }
  }
</script>
<style scoped>
@import 'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css';
</style>
