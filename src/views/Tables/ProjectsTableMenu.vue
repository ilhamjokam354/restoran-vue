<template>

  <div class="card shadow"
       :class="type === 'dark' ? 'bg-default': ''">
    <div class="card-header border-0"
         :class="type === 'dark' ? 'bg-transparent': ''">
      <div class="row align-items-center">
        <div class="col">
          <h3 class="mb-0" :class="type === 'dark' ? 'text-white': ''">
            <router-link to="tambah/menu">
              <base-button type="success" size="sm" >Tambah Data</base-button>  
            </router-link>
            

          </h3>
          <div class="col-md-4">
            <div class="md-layout md-gutter">
                <div class="md-layout-item">
                  <md-field class="mt-3" >
                    <label for="font">Kategori</label>
                    <md-select  @input="onSelect" name="font" id="font">
                      <md-option :value="kategoris.id_kategori" v-for="(kategoris, key) in kategori" :key="key">{{kategoris.kategori}}</md-option>
                      
                    </md-select>
                  </md-field>
                </div>
            </div>
          </div>
          
          
        </div>
        
      </div>
    </div>
    
    <div class="table-responsive">
      
      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th> <h5>No</h5> </th>
            <th> <h5>Menu</h5> </th>
            <th> <h5>Gambar</h5> </th>
            <th> <h5>Harga</h5> </th>
            <th> <h5>Aksi</h5> </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(results, index) in result" :key="results.id_menu">
            <td>{{index + 1}}</td>
            
            <td>{{results.menu}}</td>
            <td>
              <img height="100" width="150" :src="`http://localhost:1000/${results.gambar}`" alt="">
            </td>
            <td>{{results.harga}}</td>
            <td>
              <base-dropdown class="dropdown"
                           position="right">
              <a slot="title" class="btn btn-sm btn-icon-only text-light" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="fas fa-ellipsis-v"></i>
              </a>

              <template>
                <router-link :to="`/update/menu/${results.id_menu}`" style="text-decoration: none; cursor: pointer;">
                  
                  <a class="dropdown-item" ><i class="far fa-edit text-info"></i>Update</a>
                </router-link>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" style="text-decoration: none; cursor: pointer;" @click="deleteMenu(results.id_menu)" ><i class="fas fa-trash text-danger"></i>Delete</a>
                
              </template>
            </base-dropdown>
            </td>
          </tr>
        </tbody>
      </table>
   
    </div>

    <div class="card-footer d-flex justify-content-end"
         :class="type === 'dark' ? 'bg-transparent': ''" >
      <base-button id="pagination" type="primary" size="sm" @click="fetchPaginate(pagination.prev_page_url)" :disabled="!pagination.prev_page_url" >Prev</base-button>
      <base-button id="pagi" type="secondary" size="sm">{{pagination.current_page}}</base-button>
      <base-button id="pagina" type="primary" size="sm" @click="fetchPaginate(pagination.next_page_url)" :disabled="!pagination.next_page_url" >Next</base-button>
    </div>

    

  </div>

  
 
</template>


<script>
import axios from 'axios'
  
  export default {
    name: 'projects-table',
    
    props: {
      type: {
        type: String
      },
      title: String
    },
    data() {
      
      return {
        result : '',
        nomor : '',
        idkategori : '',
        kategori : '',
        pagination : [],
        url : 'http://localhost:1000/menu',
        font : ''
      }
    },
    mounted : function (){
        this.showAllMenu()
        this.ambilKategori()
        
        
    },
    methods : {
      showAllMenu(){
        let token = localStorage.getItem('token')
        axios.get(this.url, {
            headers : {
                Authorization: 'Bearer ' + token
            }
        })
        .then(response => {
            // console.log(response)
            let menu = response.data.data
            
            this.result = menu
            this.makePagination(response.data)
            
        })
        .catch(err => {
            console.log(err)
        })
      },
      deleteMenu(id){
        this.$swal({
          title: 'Yakin?',
          text: "Apakah Yakin Ingin Menghapus",
          icon : 'warning',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!',
          cancelButtonText: 'No, cancel!',
          buttonsStyling: true
        })
        .then((isConfirm) => {
          
          if(isConfirm.value == true){

            this.$swal({
              icon : 'success',
              text : 'Data Berhasil Di Hapus',
              title : 'Hapus Data'
            })
            .then(result => {
              if(result.value){
                let token = localStorage.getItem('token')
                axios.delete(`http://localhost:1000/menu/${id}`, {
                headers : {
                  Authorization: 'Bearer ' + token
                }
                })
                .then(() => {
                  location.reload()
                  
                })
              }
            })
           
          }
          
        })
        
      },
      ambilKategori(){
        let token = localStorage.getItem('token')
        axios.get(`http://localhost:1000/kategori`, {
          headers : {
            Authorization: 'Bearer ' + token
          }
        })
        .then(response => {
          this.kategori = response.data.data
           
        })
        .catch(err => {
          console.log(err)
        })
      },
      makePagination(data){
        let pagination = {
          current_page : data.current_page,
          last_page : data.last_page,
          next_page_url : data.next_page_url,
          prev_page_url : data.prev_page_url
        }
        this.pagination = pagination
      },
      fetchPaginate(url){
        this.url = url
        this.showAllMenu()
      },
      
      onSelect(event){
        const pg = document.getElementById('pagination')
        const pag = document.getElementById('pagi')
        const pgi = document.getElementById('pagina')
        pg.style.display = 'none'
        pag.style.display = 'none'
        pgi.style.display = 'none'
        
        this.idkategori = event
        let token = localStorage.getItem('token')
        axios.get(`http://localhost:1000/menu/kategori/${this.idkategori}`, {
          headers : {
            Authorization: 'Bearer ' + token
          }
        })
        .then(response => {
          this.result = response.data.data
          
        })
        .catch((err) => {
          this.$swal({
            icon : 'error',
            title : 'Data',
            text : 'Data Tidak Ditemukan'
          })
        })
      },
      selectKategoriMenu(){
        
      }
    } 
  }
</script>
<style>
</style>
