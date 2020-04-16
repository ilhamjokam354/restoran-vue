<template>
    <nav class="navbar navbar-vertical fixed-left navbar-expand-md navbar-light bg-white" id="sidenav-main">
        <div class="container-fluid">

            <!--Toggler-->
            <navbar-toggle-button @click.native="showSidebar">
                <span class="navbar-toggler-icon"></span>
            </navbar-toggle-button>
            <router-link class="navbar-brand" to="/" style="text-decoration: none;">
            <div class="row">
              <i class="fas fa-utensils fa-2x p-2"></i>
              <h2 > Restaurant</h2>
            </div>
            
            </router-link>

            <slot name="mobile-right">
                <ul class="nav align-items-center d-md-none">
                    <i class="fas fa-shopping-cart " style="margin-bottom : 3px;" v-if="token" @click="gotoBeli"></i>
                    <badge type="success" class="mb-3 text-default" v-if="token">{{cartItemCount}}</badge>
                    <base-dropdown class="nav-item" position="right">
                        <a slot="title" class="nav-link mb-2" href="#" role="button">
                            <div class="media align-items-center">
                              <i class="ni ni-single-02"></i>
                            </div>
                        </a>

                        <div class=" dropdown-header noti-title">
                            <h6 class="text-overflow m-0 text-center">Welcome!</h6>
                        </div>
                        <div class="dropdown-divider"></div>
                        <router-link to="/login" class="dropdown-item" v-if="!token">
                            <i class="ni ni-key-25 text-info"></i>
                            <span>Login</span>
                        </router-link>
                        <router-link to="/register" class="dropdown-item" v-if="!token">
                            <i class="ni ni-circle-08 text-pink"></i>
                            <span>Register</span>
                        </router-link>

                        
                        
                        <a @click="logoutPelanggan" class="dropdown-item" style="text-decoration: none; cursor : pointer;" v-if="token">
                            <i class="ni ni-user-run"></i>
                            <span>Logout</span>
                        </a>
                    </base-dropdown>
                </ul>
            </slot>
            <slot></slot>
            <div v-show="$sidebar.showSidebar" class="navbar-collapse collapse show" id="sidenav-collapse-main">

                <div class="navbar-collapse-header d-md-none">
                    <div class="row">
                        <div class="col-6 collapse-brand">
                            <router-link to="/" style="text-decoration: none;">
                                <div class="row">
                                  <i class="fas fa-utensils fa-2x p-2"></i>
                                  <h2> Restaurant</h2>
                              </div>
                            </router-link>
                        </div>
                        <div class="col-6 collapse-close">
                            <navbar-toggle-button @click.native="closeSidebar"></navbar-toggle-button>
                        </div>
                    </div>
                </div>

                <ul class="navbar-nav">
                    <slot name="links">
                    </slot>
                </ul>
                <!--Divider-->
                <hr class="my-3">
                
            </div>
            </div>
    </nav>
</template>
<script>
  import NavbarToggleButton from '@/components/NavbarToggleButton'

  export default {
    name: 'sidebar',
    data (){
      return {
        token : ''
      }
    },
    components: {
      NavbarToggleButton
    },
    props: {
      logo: {
        type: String,
        default: 'img/brand/logo.png',
        description: 'Sidebar app logo'
      },
      autoClose: {
        type: Boolean,
        default: true,
        description: 'Whether sidebar should autoclose on mobile when clicking an item'
      }
    },
    computed : {
      cartItemCount(){
        return this.$store.getters.cartItemCount
      }
    },
    provide() {
      return {
        autoClose: this.autoClose
      };
    },
    methods: {
      gotoBeli(){
        this.$router.push('/kategori/beli')
      },
      closeSidebar() {
        this.$sidebar.displaySidebar(false)
      },
      showSidebar() {
        this.$sidebar.displaySidebar(true)
      },
      logoutPelanggan(){
        this.$swal({
          title: 'Yakin?',
          text: "Apakah Yakin Ingin Keluar",
          icon : 'warning',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Ya!',
          cancelButtonText: 'Tidak!',
          buttonsStyling: true
        })
        .then(isConfirm => {
          if(isConfirm.value){
            localStorage.removeItem('token');
            localStorage.removeItem('id_order');
            localStorage.removeItem('user');
            localStorage.removeItem('id_user');
            const Toast = this.$swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              onOpen: (toast) => {
                toast.addEventListener('mouseenter', this.$swal.stopTimer)
                toast.addEventListener('mouseleave', this.$swal.resumeTimer)
              }
            })

            Toast.fire({
              icon: 'success',
              title: 'Sign out successfully'
            })
            this.$router.push('/login')
          }
        })
        
      }
    },
    beforeDestroy() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.showSidebar = false;
      }
    },
    mounted : function(){
      this.token = localStorage.getItem('token');
    }
  };
</script>

<style scoped>  
  @import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.1/js/all.min.js';
  @import 'https://fonts.googleapis.com/css?family=Acme&display=swap';

h2 {
  font-family: 'Acme';
  font-size: 1.7em;
  background: -webkit-linear-gradient(#172b4d, #2dce89);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.fa-utensils{
  background: -webkit-linear-gradient(#172b4d, #2dce89);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

</style>