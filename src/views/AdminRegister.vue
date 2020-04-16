<template>
    <div class="row justify-content-center">
        <div class="col-lg-5 col-md-7">
            <div class="card bg-secondary shadow border-0">
                
                <div class="card-body px-lg-5 py-lg-5">
                    <div class="text-center text-muted mb-4">
                        <h1>Admin Registrasi</h1>
                    </div>
                    <form role="form">

                        <base-input class="input-group-alternative mb-3"
                                    placeholder="Username"
                                    addon-left-icon="ni ni-hat-3"
                                    required
                                    v-model="model.user">
                        </base-input>

                        <base-input class="input-group-alternative mb-3"
                                    placeholder="Email"
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
                                    v-on:keyup.13="registerWithKey">
                        </base-input>

                        <label for="level">Level : </label>
                        <select name="" id="level" v-model="model.level">
                            <option value="" disabled>Pilih Salah Satu</option>
                            <option value="admin">Admin</option>
                            <option value="kasir">Kasir</option>
                        </select>
                        

                        <div class="row my-4">
                            
                        </div>
                        <div class="text-center">
                            <base-button type="primary" class="my-4" @click="registerAdmin">Create account</base-button>
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
                    <router-link to="/admin/login" class="text-light">
                        <small>Login into your account</small>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>


  export default {
    name: 'register',
    data() {
      return {
        model: {
          user: '',
          email: '',
          password: '',
          level : ''
        }
      }
    },
    methods : {
        registerWithKey(){
            this.registerAdmin()
        },
        registerAdmin(){
            if(!this.model.user || !this.model.email || !this.model.password || !this.model.level){
                this.$swal({
                    icon : 'error',
                    title : 'Data !',
                    text : 'Tidak Boleh Kosong'
                })
            }else{
                axios.post('http://localhost:1000/register', this.model)
                .then(response => {
                    this.$swal({
                        icon : 'success',
                        title : 'Register !',
                        text : response.data.message + ' Silahkan Login'
                    })
                    .then(result => {
                        if(result.value){
                            this.$router.push('/admin/login')
    
                        }
                    })
                    
                })
                .catch(err => {
                    this.$swal({
                        icon : 'error',
                        title : 'Register !',
                        text : err.data.message
                    })
                })

            }
            
        }
    }
  }
</script>
<style>
</style>
