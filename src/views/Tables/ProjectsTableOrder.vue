<template>

  <div class="card shadow"
       :class="type === 'dark' ? 'bg-default': ''">
    <div class="card-header border-0"
         :class="type === 'dark' ? 'bg-transparent': ''">
      <div class="row align-items-center">
        <div class="col-md-4">
          
            <base-input placeholder="Search" v-model="search" v-on:keyup="searchKey"></base-input>
        </div>
        
      </div>
    </div>
    
    <div class="table-responsive">
      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th> <h5>No</h5></th>
            <th> <h5>Pelanggan</h5> </th>
            <th> <h5>Tanggal</h5> </th>
            <th> <h5>Total</h5> </th>
            <th> <h5>Bayar</h5> </th>
            <th> <h5>Kembali</h5> </th>
            <th> <h5>Status</h5> </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(results, index) in result" :key="index">
            <td>{{index + 1}}</td>
            <td>{{results.user}}</td>
            <td>{{results.tgl_order}}</td>
            <td>{{results.total}}</td>
            <td>{{results.bayar}}</td>
            <td>{{results.kembali}}</td>
            <td>
              <router-link v-if="results.status == 0" :to="`/admin/order/bayar/${results.id_order}`">
                <base-button type="danger" size="sm">
                  <i class="fas fa-money-bill-alt"></i> Bayar
                  
                </base-button>
              </router-link>
              <base-button type="success" size="sm" v-if="results.kembali >= 0 && results.bayar > 0">
                <i class="fas fa-check"></i> Lunas
              </base-button>
              <router-link v-if="results.kembali < 0" :to="`/admin/order/hutang/${results.id_order}`">
                <base-button type="warning" size="sm">
                  <i class="fas fa-times"></i> Hutang
                </base-button>

              </router-link >
            </td>
          </tr>
        </tbody>

      </table>
    </div>

    <!-- <div class="card-footer d-flex justify-content-end"
         :class="type === 'dark' ? 'bg-transparent': ''">
      <base-button type="primary" size="sm" @click="fetchPaginate(pagination.prev_page_url)" :disabled="!pagination.prev_page_url" >Prev</base-button>
      <base-button type="secondary" size="sm">{{pagination.current_page}}</base-button>
      <base-button type="primary" size="sm" @click="fetchPaginate(pagination.next_page_url)" :disabled="!pagination.next_page_url" >Next</base-button>
    </div> -->

    

  </div>

  
 
</template>

<script>
import axios from 'axios'
  
  export default {
    name: 'projects-table',
    components : {
  
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
        token : '',
        search : ""

      }
    },
    mounted () {
      this.getAllOrder()
    },
    methods : {
      searchKey(e){
        let token = localStorage.getItem('token')
        if(e.keyCode == 13){
          axios.get(`http://localhost:1000/search/vorder/${this.search}`, {
            headers : {
              Authorization: 'Bearer ' + token
            }
          })
          .then(response => {
            
            this.result = response.data
            
            this.search = ''

          })
          
        }
      },
      getAllOrder(){
        let token = localStorage.getItem('token')  
        axios.get('http://localhost:1000/vorder', {
          headers : {
            Authorization: 'Bearer ' + token
          }
        })
        .then(response => {
          // console.log(response.data)
          this.result = response.data
        })
      }
    }
    
  }
</script>
<style>
</style>
