<template>

  <div class="card shadow"
       :class="type === 'dark' ? 'bg-default': ''">
    <div class="card-header border-0"
         :class="type === 'dark' ? 'bg-transparent': ''">
      <div class="row align-items-center">
        <div class="col">
          <h3 class="mb-0" :class="type === 'dark' ? 'text-white': ''">
            <router-link to="tambah/kategori">
              <base-button type="success" size="sm" >Tambah Data</base-button>  
            </router-link>
            

          </h3>
        </div>
        
      </div>
    </div>
    
    <div class="table-responsive">
      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th> <h5>No</h5></th>
            <th> <h5>Kategori</h5> </th>
            <th> <h5>Aksi</h5> </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(results, index) in result" :key="results.id_kategori">
            <td>{{index + 1}}</td>
            <td>{{results.kategori}}</td>
            <td>
              <base-dropdown class="dropdown"
                           position="right">
              <a slot="title" class="btn btn-sm btn-icon-only text-light" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="fas fa-ellipsis-v"></i>
              </a>

              <template>
                <router-link :to="`/update/kategori/${results.id_kategori}`" style="text-decoration: none; cursor: pointer;">
                  
                  <a class="dropdown-item" ><i class="far fa-edit text-info"></i>Update</a>
                </router-link>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" style="text-decoration: none; cursor: pointer;" @click="deleteKategori(results.id_kategori)" ><i class="fas fa-trash text-danger"></i>Delete</a>
                
              </template>
            </base-dropdown>
            </td>
          </tr>
        </tbody>

      </table>
    </div>

    <div class="card-footer d-flex justify-content-end"
         :class="type === 'dark' ? 'bg-transparent': ''">
      <base-button type="primary" size="sm" @click="fetchPaginate(pagination.prev_page_url)" :disabled="!pagination.prev_page_url" >Prev</base-button>
      <base-button type="secondary" size="sm">{{pagination.current_page}}</base-button>
      <base-button type="primary" size="sm" @click="fetchPaginate(pagination.next_page_url)" :disabled="!pagination.next_page_url" >Next</base-button>
    </div>

    

  </div>

  
 
</template>


<script>
import Modal from '@/components/Modal.vue'
  
  export default {
    name: 'projects-table',
    components : {
      Modal
    },
    props: {
      type: {
        type: String
      },
      title: String,
      
    },
    data() {
      
      return {
        result : '',
        pagination : [],
        url : 'http://localhost:1000/kategori'
      }
    },
    mounted : function (){
      this.showAllKategori()
    },
    methods : {
      showAllKategori(){
        let token = localStorage.getItem('token')
        axios.get(this.url, {
            headers : {
                Authorization: 'Bearer ' + token
            }
        })
        .then(response => {
            // console.log(response)
            let kategori = response.data.data
           
            this.result = kategori
            this.makePagination(response.data)
        })
        .catch(() => {
          this.$swal({
            icon : 'error',
            title : '401',
            text : 'Maaf Token Sudah Kadaluarsa, Silahkan Login Lagi'
          })
          .then((isConfirm) => {
            if(isConfirm.value == true){
              this.$router.push('/admin/login')
            }
          })
        })
      },
      deleteKategori(id){
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
              title : 'Delete!',
              text : 'Hapus Data Berhasil'
            })
            .then(result => {
              if(result.value){
                let token = localStorage.getItem('token')
                axios.delete(`http://localhost:1000/kategori/${id}`, {
                  headers : {
                    Authorization: 'Bearer ' + token
                  }
                })
                .then(response => {
                  
                  location.reload()
                  // this.$router.push('/admin/kategori')
                })
              }
            })
            
          }

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
        this.showAllKategori()
      }
    }
  }
</script>
<style>
</style>
