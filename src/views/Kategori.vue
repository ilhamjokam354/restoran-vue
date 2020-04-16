<template>
    <div>
        <base-header type="gradient-success" class="pb-6 pb-2 pt-5 pt-md-1">
           
        </base-header>
        
       <div class="container-fluid" >
         
         <div class="col-md-4">
           <div class="md-layout-item">
            <md-field>
              <label for="movie">Pilih Kategori</label>
              <md-select @input="onSelect" name="movie" id="movie">
                <md-option v-for="(kategori, key) in resultKategori" :key="key" :value="kategori.id_kategori">{{kategori.kategori}}</md-option>
                
              </md-select>
            </md-field>
          </div>
         </div>

       </div>
        
       
        <div class="container-fluid mt-6 ">
            
                
            <div class="row">
                <div class="col" >
                  
                    <md-card md-with-hover v-for="(results, key) in products" :key="key" class="mb-3 mr-3" style="min-height: 300px">
                        <md-card-area>
                            <md-card-media>
                            <img style="max-width: 350px; max-height:150px;" :src="`http://localhost:1000/${results.gambar}`" alt="People">
                            </md-card-media>

                            <md-card-header>
                            <div class="md-title">{{results.menu}}</div>
                            <div class="md-subhead text-danger"><b>Rp. {{Intl.NumberFormat(['ban', 'id']).format(results.harga)}}</b></div>
                            </md-card-header>

                            <md-card-content>
                            
                            </md-card-content>
                        </md-card-area>

                        <md-card-actions md-alignment="right">
                          <!-- <router-link :to="`/beli/${results.id_menu}`"> -->
                            <md-button @click="beliProduk(results)"><i class="fas fa-shopping-cart text-primary"></i> Beli</md-button>
                          <!-- </router-link>   -->
                        </md-card-actions>
                    </md-card>
    
                </div>
            </div> 

            <div class="d-flex justify-content-first"  >
              <ul class="pagination" id="pagination" >
              <li class="page-item prev-page" >
                <button class="page-link" aria-label="Previous" @click="prevPage" >
                  <span aria-hidden="true"><i class="fa fa-angle-left" aria-hidden="true"></i></span>
                </button>
              </li>
              <li class="page-item" >
                <a class="page-link bg-primary text-secondary" >{{current_page}}</a>
              </li>
              <li class="page-item next-page"  >
                <button class="page-link" aria-label="Next" @click="nextPage"  >
                  <span aria-hidden="true"><i class="fa fa-angle-right" aria-hidden="true"></i></span>
                </button>
              </li>
            </ul>
            </div>
        </div>
      
    </div>
</template>
<script>
import axios from 'axios' 

  export default {
    name: 'tables',
    
    data (){
        return {
            resultKategori : '',
            resultMenu : '',
            pagination : [],
            url : 'http://localhost:1000/pelanggan/menu',
            prevpage : ''

        }
    },
    
    mounted : function (){
        this.getAllKategori(),
        
        this.$store.dispatch('getProductAll')
       
    },
    methods : {
      getAllKategori(){
        let token = localStorage.getItem('token')
        axios.get('http://localhost:1000/pelanggan/kategori')
        .then(response => {
            // console.log(response)
            this.resultKategori = response.data.data
            
        })
      },
      
      beliProduk(e){
        let token = localStorage.getItem('token')

        if(!token){
          this.$swal({
            icon : 'warning',
            title : 'Maaf !',
            text : 'Untuk Membeli Produk Anda Harus Login Dahulu!'
          })
          .then(isConfirm => {
            if(isConfirm.value){
              this.$swal({
                title: 'Anda !',
                text: "Akan Diarahkan Ke Halaman Login",
                icon : 'warning',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ya, Ke Halaman Login',
                cancelButtonText: 'Tidak',
                buttonsStyling: true
              })
              .then(result => {
                if(result.value){
                  setTimeout(() => {
                    this.$router.push('/login')

                  }, 1000)
                }
              })

            }
          })
        }else{
          
          this.$store.dispatch('addToCartProduct', {
            product : e,
            jumlah : 1
          })
          
        }
      },
      onSelect(event){
        const pag = document.getElementById('pagination')
        pag.style.display = 'none'
        this.idkategori = event
        let token = localStorage.getItem('token')
        axios.get(`http://localhost:1000/menu/kategori/${this.idkategori}`)
        .then(response => {
          
          this.$store.state.products = response.data.data
          
        })
        .catch((err) => {
          this.$swal({
            icon : 'error',
            title : 'Data',
            text : 'Data Tidak Ditemukan'
          })
        })
      },
      nextPage(){
       
        axios.get(this.$store.state.next_page)
        .then(response => {
          this.$store.state.products = response.data.data
          this.$store.state.current_page = response.data.current_page
          this.prevpage = response.data.prev_page_url
        })
      },
      prevPage(){
         axios.get(this.prevpage)
        .then(response => {
          this.$store.state.products = response.data.data
          this.$store.state.current_page = response.data.current_page
        })
      }
    },
    computed : {
      products () {
        return this.$store.state.products
      },
      current_page () {
        return this.$store.state.current_page
        
      },
      cartTotal(){

      }
      
    }

  };
</script>
<style lang="scss" scoped>
  
  .md-card {
    width: 320px;
    margin: 4px;
    display: inline-block;
    vertical-align: top;
  }

  .md-card-example {
    .md-subhead {
      .md-icon {
        $size: 16px;

        width: $size;
        min-width: $size;
        height: $size;
        font-size: $size !important;
      }

      span {
        vertical-align: middle;
      }
    }

    .card-reservation {
      margin-top: 8px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .md-icon {
        margin: 8px;
      }
    }

    .md-button-group {
      display: flex;

      .md-button {
        min-width: 60px;
        border-radius: 2px;
      }
    }


  }
</style>
