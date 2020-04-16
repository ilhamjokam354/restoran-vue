<template>
    <nav class="navbar navbar-vertical fixed-left navbar-expand-md navbar-light bg-white" id="sidenav-main">
        <div class="container-fluid">

            <!--Toggler-->
            <navbar-toggle-button @click.native="showSidebar">
                <span class="navbar-toggler-icon"></span>
            </navbar-toggle-button>
            <router-link class="navbar-brand" to="/dashboard/admin" style="text-decoration: none; cursor: pointer;">
            <div class="row">
              <i class="fas fa-utensils fa-2x p-2"></i>
              <h2> Admin</h2>
            </div>
            
            </router-link>

            <slot name="mobile-right">
                <ul class="nav align-items-center d-md-none">
                    <base-dropdown class="nav-item" position="right">
                        <a slot="title" class="nav-link nav-link-icon" href="#" role="button" data-toggle="dropdown"
                           aria-haspopup="true" aria-expanded="false">
                            <i class="ni ni-bell-55"></i>
                        </a>

                        <a class="dropdown-item" href="#">Action</a>
                        <a class="dropdown-item" href="#">Another action</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="#">Something else here</a>
                    </base-dropdown>
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
                        <a style="text-decoration: none; cursor: pointer;" class="dropdown-item" @click="logout">
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
                            <router-link to="/dashboard/admin" style="text-decoration: none; cursor: pointer;">
                                <div class="row">
                                  <i class="fas fa-utensils fa-2x p-2"></i>
                                  <h2> Admin</h2>
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
    provide() {
      return {
        autoClose: this.autoClose
      };
    },
    methods: {
      closeSidebar() {
        this.$sidebar.displaySidebar(false)
      },
      showSidebar() {
        this.$sidebar.displaySidebar(true)
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
    beforeDestroy() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.showSidebar = false;
      }
    }
  };
</script>

<style scoped>  
 
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