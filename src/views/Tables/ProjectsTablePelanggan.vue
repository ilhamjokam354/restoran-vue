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
      <base-table class="table align-items-center table-flush"
                  :class="type === 'dark' ? 'table-dark': ''"
                  :thead-classes="type === 'dark' ? 'thead-dark': 'thead-light'"
                  tbody-classes="list"
                  :data="result"
                  
                  >
        <template slot="columns">
          <th>No</th>
          <th>Pelanggan</th>
          <th>Alamat</th>
          <th>Telepon</th>
          <th>Email</th>
          <th>Aksi</th>
        </template>

        <template slot-scope="{row}" >

          <th scope="row" >
            
          </th>

          
            <th scope="row">
              <div class="media align-items-center">
              
              <div class="media-body">
                <span class="name mb-0 text-sm" >
                  <h3>{{row.pelanggan}}</h3>
                </span>
              </div>
            </div>
            </th>

            <th scope="row">
              <div class="media align-items-center">
              
              <div class="media-body">
                <span class="name mb-0 text-sm" >
                  <h3>{{row.alamat}}</h3>
                </span>
              </div>
            </div>
            </th>

            <th scope="row">
              <div class="media align-items-center">
              
              <div class="media-body">
                <span class="name mb-0 text-sm" >
                  <h3>{{row.telp}}</h3>
                </span>
              </div>
            </div>
            </th>

            <th scope="row">
              <div class="media align-items-center">
              
              <div class="media-body">
                <span class="name mb-0 text-sm" >
                  <h3>{{row.email}}</h3>
                </span>
              </div>
            </div>
            </th>
           
          

          <td >
            <base-dropdown class="dropdown"
                           position="right">
              <a slot="title" class="btn btn-sm btn-icon-only text-light" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="fas fa-ellipsis-v"></i>
              </a>

              <template>
                <router-link to="" style="text-decoration: none; cursor: pointer;">
                  
                  <a class="dropdown-item" ><i class="fas fa-toggle-on text-success"></i>Aktif</a>
                </router-link>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item"  @click="deleteKategori(row.id_pelanggan)" style="text-decoration: none; cursor: pointer;" ><i class="fas fa-trash text-danger"></i>Delete</a>
                
              </template>
            </base-dropdown>
          </td>

        </template>

      </base-table>
    </div>

    <div class="card-footer d-flex justify-content-end"
         :class="type === 'dark' ? 'bg-transparent': ''">
      <base-pagination ></base-pagination>
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
      title: String
    },
    data() {
      
      return {
        result : '',
        nomor : ''
      }
    },
    mounted : function (){
        let token = localStorage.getItem('token')
        axios.get('http://localhost:1000/pelanggan', {
            headers : {
                Authorization: 'Bearer ' + token
            }
        })
        .then(response => {
            
            let pelanggan = response.data.data
            // console.log(pelanggan)
            // let nomor = response.data.total
            // this.nomor = nomor
            this.result = pelanggan
            
            
        })
        
    },
    methods : {
      
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
        .then(function(isConfirm){
          if(isConfirm.value == true){
            
            let token = localStorage.getItem('token')
            axios.delete(`http://localhost:1000/pelanggan/${id}`, {
              headers : {
                Authorization: 'Bearer ' + token
              }
            })
            .then(response => {
              
              location.reload()
              // this.$router.push('/admin/kategori')
            })
            .catch(err => {
              console.log(err)
            })
          }

        })
        
        
      }
    }
  }
</script>
<style>
</style>
