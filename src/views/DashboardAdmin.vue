<template>
    <div>
        <base-header type="gradient-primary" class="pb-6 pb-8 pt-5 pt-md-8">
            <!-- Card stats -->
            <div class="row">
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="Kategori"
                                type="gradient-red"
                                :sub-title= kategori.toString()
                                icon="ni ni-align-left-2"
                                class="mb-4 mb-xl-0">

                        
                    </stats-card>
                </div>
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="Menu"
                                type="gradient-orange"
                                :sub-title= "menu.toString()"
                                icon="ni ni-bullet-list-67"
                                class="mb-4 mb-xl-0">

                        
                    </stats-card>
                </div>
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="Order"
                                type="gradient-green"
                                :sub-title= "order.toString()"
                                icon="ni ni-cart"
                                class="mb-4 mb-xl-0">

                        
                    </stats-card>

                </div>
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="Order Detail"
                                type="gradient-info"
                                :sub-title= "orderDetail.toString()"
                                icon="ni ni-cart"
                                class="mb-4 mb-xl-0">

                       
                    </stats-card>
                </div>

                

                
            </div>
            <div class="row">
              

                <div class="col-xl-3 col-lg-6">
                    <stats-card title="User"
                                type="gradient-default"
                                :sub-title= "userDb.toString()"
                                icon="ni ni-single-02"
                                class="mb-4 mb-xl-0">

                       
                    </stats-card>
                </div>
            </div>
        </base-header>

      
    </div>
</template>
<script>


  export default {
    
    props : {
      subTitle : String
    },
    data() {
      return {
        
        kategori : '',
        menu : '',
        order : '',
        orderDetail : '',
        pelanggan : '',
        userDb : ''
        
      };
    },
    methods: {

    },
    mounted() {
      let token = localStorage.getItem('token')
      let level = localStorage.getItem('level')
      if(!token){
        this.$router.push('/admin/login')
      }else if(!level){
        this.$router.push('/dashboard')
      }
    },
    created () {
      let token = localStorage.getItem('token')
      axios.get('http://localhost:1000/kategori', {
        headers : {
          Authorization: 'Bearer ' + token
        }
      })
      .then(response => {
        // console.log(response)
        this.kategori = response.data.total
      })
      
      axios.get('http://localhost:1000/menu', {
        headers : {
          Authorization: 'Bearer ' + token
        }
      })
      .then(response => {
        // console.log(response)
        this.menu = response.data.total
      })

      axios.get('http://localhost:1000/order', {
        headers : {
          Authorization: 'Bearer ' + token
        }
      })
      .then(response => {
        // console.log(response)
        this.order = response.data.total
      })

      axios.get('http://localhost:1000/order_detail', {
        headers : {
          Authorization: 'Bearer ' + token
        }
      })
      .then(response => {
        // console.log(response)
        this.orderDetail = response.data.total
      })

      axios.get('http://localhost:1000/pelanggan', {
        headers : {
          Authorization: 'Bearer ' + token
        }
      })
      .then(response => {
        // console.log(response)
        this.pelanggan = response.data.total
      })

      axios.get('http://localhost:1000/user', {
        headers : {
          Authorization: 'Bearer ' + token
        }
      })
      .then(response => {
        // console.log(response)
        this.userDb = response.data.total
      })

    }
  };
</script>
<style></style>
