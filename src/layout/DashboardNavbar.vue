<template>
    <base-nav class="navbar-top navbar-dark"
              id="navbar-main"
              :show-toggle-button="false"
              expand >
        <form class="navbar-search navbar-search-dark form-inline mr-2 d-none d-md-flex ml-lg-auto ">
            <div class="form-group mb-0">
                
            </div>
        </form>
        <ul class="navbar-nav align-items-center d-none d-md-flex">

            <router-link to="/kategori/beli" >
              <i v-if="token" class="fas fa-shopping-cart text-secondary mt-1" style="font-size: 20px; "></i>
              
            </router-link>
            <badge v-if="token" type="success" class="mb-3 text-default">{{cartItemCount}}</badge>      
            

            <li class="nav-item dropdown">
                    
                <base-dropdown class="nav-link pr-0" position="right">
                    <div class="media align-items-center" slot="title">
                      
                      <i class="fas fa-user" style="font-size: 20px;"></i>
                
                        <div class="media-body ml-2 d-none d-lg-block" >
                            <span class="mb-0 text-sm font-weight-bold" style="text-decoration: none; cursor: pointer;" >{{ userName }}</span>
                            
                        </div>
                    </div>

                    <template>
                        <div class="dropdown-header noti-title">
                            <h6 class="text-overflow m-0 text-center">Welcome!</h6>
                        </div>
                        
                        <div class="dropdown-divider"></div>
                        <router-link to="/login" v-if="!token" class="dropdown-item" style="text-decoration : none;">
                          <i class="ni ni-key-25 text-info"></i>
                          <span>Login</span>
                        </router-link>

                        <router-link to="/register" v-if="!token" class="dropdown-item" style="text-decoration : none;">
                          <i class="ni ni-circle-08 text-pink"></i>
                          <span>Register</span>
                        </router-link>
                       
                        
                        <div class="dropdown-item" v-if="token" @click="logoutPelanggan">
                          <i class="ni ni-user-run"></i>
                            <span style="cursor: pointer;" >Logout</span>
                        </div>
                            
                        
                    </template>
                </base-dropdown>
            </li>
        </ul>
    </base-nav>
</template>
<script>
  export default {
    data() {
      return {
        activeNotifications: false,
        showMenu: false,
        searchQuery: '',
        token : '',
        userName : ''
      };
    }, 
    
    created (){
      let user = localStorage.getItem('user')
      this.userName = user
    },
    methods: {
      toggleSidebar() {
        this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
      },
      hideSidebar() {
        this.$sidebar.displaySidebar(false);
      },
      toggleMenu() {
        this.showMenu = !this.showMenu;
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
            localStorage.removeItem('user');
            localStorage.removeItem('id_user');
            localStorage.removeItem('id_order');
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
    mounted : function(){
      this.token = localStorage.getItem('token')
  
    },
    computed : {
      cartItemCount(){
        return this.$store.getters.cartItemCount
      }
    }
  };
</script>

