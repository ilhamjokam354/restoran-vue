<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <sidebar-admin
      :background-color="sidebarBackground"
      short-title="Admin"
      title=""
      
    >
      <template slot="links">
        <sidebar-item
        v-if="levelUser == 'admin'"
          :link="{
            name: 'Dashboard Admin',
            icon: 'ni ni-tv-2 text-primary',
            path: '/dashboard/admin'
            
          }"
        />

        <sidebar-item v-if="levelUser == 'admin'" :link="{name: 'Kategori', icon: 'ni ni-align-left-2 text-red', path: '/admin/kategori'}"/>
        <sidebar-item v-if="levelUser == 'admin'" :link="{name: 'Menu', icon: 'ni ni-bullet-list-67 text-info', path: '/admin/menu'}"/>
        <sidebar-item v-if="levelUser == 'admin'" :link="{name: 'Order', icon: 'ni ni-cart text-warning', path: '/admin/order'}"/>
        <sidebar-item v-if="levelUser == 'admin'"  :link="{name: 'Order Detail', icon: 'ni ni-cart text-success', path: '/admin/order-detail'}"/>
        <!-- <sidebar-item :link="{name: 'Pelanggan', icon: 'ni ni-circle-08 text-primary', path: '/admin/pelanggan'}"/> -->
        <sidebar-item v-if="levelUser == 'admin'" :link="{name: 'User', icon: 'ni ni-single-02 text-default', path: '/admin/user'}"/>

        <sidebar-item v-if="levelUser == 'kasir'" :link="{name: 'Order', icon: 'ni ni-cart text-warning', path: '/admin/order'}"/>
        <sidebar-item v-if="levelUser == 'kasir'"  :link="{name: 'Order Detail', icon: 'ni ni-cart text-success', path: '/admin/order-detail'}"/>

      </template>
    </sidebar-admin>
    <div class="main-content" :data="sidebarBackground">
      <dashboard-navbar-admin></dashboard-navbar-admin>

      <div @click="toggleSidebar">
        <fade-transition :duration="200" origin="center top" mode="out-in">
          <!-- your content here -->
          <router-view></router-view>
        </fade-transition>
        <content-footer v-if="!$route.meta.hideFooter"></content-footer>
      </div>
    </div>
  </div>
</template>
<script>
  import DashboardNavbarAdmin from './DashboardNavbarAdmin.vue';
  import ContentFooter from './ContentFooter.vue';
  import { FadeTransition } from 'vue2-transitions';

  export default {
    components: {
      DashboardNavbarAdmin,
      ContentFooter,
      FadeTransition
    },
    props : {
      admin : String,
      kasir : String
    },
    data() {
      return {
        sidebarBackground: 'vue', //vue|blue|orange|green|red|primary
        levelUser : "",
       
        

      };
    },
    mounted (){
      
      this.levelUser = localStorage.getItem('level')
      
    },
    methods: {
      toggleSidebar() {
        if (this.$sidebar.showSidebar) {
          this.$sidebar.displaySidebar(false);
        }
      }
    }
  };
</script>
<style lang="scss">
</style>
