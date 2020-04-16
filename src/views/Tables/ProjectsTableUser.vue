<template>

  <div class="card shadow"
       :class="type === 'dark' ? 'bg-default': ''">
    <div class="card-header border-0"
         :class="type === 'dark' ? 'bg-transparent': ''">
      <div class="row align-items-center">
        <div class="col">
          <h3 class="mb-0" :class="type === 'dark' ? 'text-white': ''">
            

          </h3>
        </div>
        
      </div>
    </div>
    
    <div class="table-responsive">
      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <td> <h5>No</h5></td>
            <td> <h5>User</h5></td>
            <td> <h5>Alamat</h5></td>
            <td> <h5>Telepon</h5></td>
            <td> <h5>Email</h5></td>
            <td> <h5>Level</h5></td>
            <td> <h5>Aksi</h5></td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(results, index) in result" :key="index">
            <td>{{index + 1}}</td>
            <td>{{results.user}}</td>
            <td>{{results.alamat}}</td>
            <td>{{results.telepon}}</td>
            <td>{{results.email}}</td>
            <td>{{results.level}}</td>
            <td>
              <base-dropdown class="dropdown"
                           position="right">
              <a slot="title" class="btn btn-sm btn-icon-only text-light" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="fas fa-ellipsis-v"></i>
              </a>

              <template>
                
                  
                  <a class="dropdown-item" v-if="results.aktif == 1" @click="bannedUser(results.id_user)" ><i class="fas fa-toggle-on text-success"></i>Aktif</a>
                  <a class="dropdown-item" v-if="results.aktif == 0" @click="aktifUser(results.id_user)" ><i class="fas fa-toggle-on text-danger"></i>Banned</a>

                <div class="dropdown-divider"></div>
                <a class="dropdown-item" style="text-decoration: none; cursor: pointer;" @click="deleteUser(results.id_user)" ><i class="fas fa-trash text-danger"></i>Delete</a>
                
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
import axios from 'axios'  
  export default {
    name: 'projects-table',
    components : {
      Modal
    },
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
        url : 'http://localhost:1000/user',
        pagination : [],
        aktif : ''
      }
    },
    mounted : function (){
        this.showAllUser()
        
    },
    methods : {
      showAllUser(){
        let token = localStorage.getItem('token')
        axios.get(this.url, {
            headers : {
                Authorization: 'Bearer ' + token
            }
        })
        .then(response => {
            
            let user = response.data.data
            // console.log(user)
            // let nomor = response.data.total
            // this.nomor = nomor
            this.result = user
            this.makePagination(response.data)
            localStorage.setItem('aktif', response.data.data.aktif)
            
            
        })
      },
      
      deleteUser(id){
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
              title : 'Data !',
              text : 'Data Berhasil Di Hapus'
            })
            .then(result => {
              if(result.value){
                let token = localStorage.getItem('token')
                axios.delete(`http://localhost:1000/user/${id}`, {
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
        this.showAllMenu()
      },
      bannedUser(id){
        this.$swal({
          title: 'Yakin?',
          text: "Apakah Yakin Ingin Menonaktifkan User !",
          icon : 'warning',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Ya!',
          cancelButtonText: 'Tidak!',
          buttonsStyling: true
        })
        .then((isConfirm) => {
          if(isConfirm.value == true){
            this.$swal({
              icon : 'success',
              text : 'User Telah Di Banned',
              title : 'User'
            })
            .then(result => {
              if(result.value){
                axios.post('http://localhost:1000/user/banned/'+id )
                .then(response => {
                  
                  this.aktif = response.data.data.aktif
                  location.reload()
                })
              }
            })
            
            
            
          }
        })
        
      },
      aktifUser(id){
        this.$swal({
          title: 'Yakin?',
          text: "Apakah Yakin Ingin Mengaktifkan User !",
          icon : 'warning',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Ya!',
          cancelButtonText: 'Tidak!',
          buttonsStyling: true
        })
        .then((isConfirm) => {
          if(isConfirm.value == true){
            this.$swal({
              icon : 'success',
              title : 'User',
              text : 'User Telah Aktif'

            })
            .then(result => {
              if(result.value){
                axios.post('http://localhost:1000/user/aktif/'+id )
                .then(response => {
                  
                  this.aktif = response.data.data.aktif
                  location.reload()
                })
              }
            })
            
            
            
            
          }
        })
        
      }
    }
  }
</script>
<style scoped>
.dropdown-item{
  cursor: pointer;
}
</style>
