<template>
    <base-nav class="navbar-top navbar-dark"
              id="navbar-main"
              :show-toggle-button="false"
              expand>
        <form class="navbar-search navbar-search-dark form-inline mr-2 d-none d-md-flex ml-lg-auto">
            <div class="form-group mb-0">
                
            </div>
        </form>
        <ul class="navbar-nav align-items-center d-none d-md-flex">
            <li class="nav-item dropdown">
                <base-dropdown class="nav-link pr-0 mr-5" v-if="token">
                    <div class="media align-items-center" slot="title">
                
                  <i class="ni ni-single-02 text-lg"></i>
                    <h3></h3>
                        <div class="media-body ml-2 d-none d-lg-block" style="text-decoration: none; cursor: pointer;">
                            <span class="mb-0 text-sm  font-weight-bold">{{userAdmin}}</span>
                            
                        </div>
                    </div>

                    <template >
                        <div class="dropdown-header noti-title">
                            <h6 class="text-overflow m-0 text-center">Welcome!</h6>
                        </div>
                        
                        
                        <div class="dropdown-item bg-gradient-danger" style="text-decoration: none; cursor: pointer;" v-if="level == 'admin'">
                            <i class="fas fa-user-cog"></i>
                            <span >Level : {{level}}</span>
                        </div>
                        <div class="dropdown-item bg-gradient-danger" style="text-decoration: none; cursor: pointer;" v-if="level == 'kasir'" >
                            <i class="fas fa-cash-register"></i>
                            <span >Level : {{level}}</span>
                        </div>
                        <div class="dropdown-divider"></div>
                        <div  class="dropdown-item" style="text-decoration: none; cursor: pointer;" @click="logout" >
                            <i class="ni ni-user-run"></i>
                            <span >Logout</span>
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
        userAdmin : '',
        level : ''
      };
    },
    mounted (){
      let user = localStorage.getItem('user')
      this.userAdmin = user
      this.level = localStorage.getItem('level')
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
      logout(){
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
              localStorage.removeItem('token')
              localStorage.removeItem('level')
              localStorage.removeItem('user')
              localStorage.removeItem('aktif')

              this.$router.push('/admin/login')
          }
        })
        
      }
    },
    computed : {
      token (){
        return localStorage.getItem('token')
      }
    }
  };
</script>
