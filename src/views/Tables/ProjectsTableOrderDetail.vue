<template>
  
  <div class="card shadow"
       :class="type === 'dark' ? 'bg-default': ''">
    <div class="card-header border-0"
         :class="type === 'dark' ? 'bg-transparent': ''">
      <div class="row align-items-center">
        <div class="col-md-6">
          
          <h3>Tanggal Awal</h3>
          <base-input type="date" v-model="tgl_awal" name="tgl_akhir"></base-input>
        </div>
        <div class="col-md-6">
          
          <h3>Tanggal Akhir</h3>
          <base-input type="date" v-model="tgl_akhir" name="tgl_akhir"></base-input>
        </div>
        
        <base-button  type="primary" size="sm" class="ml-3 mt--3" @click="cariTgl">Cari</base-button>
      </div>
      <div class="row justify-content-end mt--3">
        <div class="col-4">

          <base-input label="Cari..." v-model="nama" placeholder="ex.nama.dll" v-on:keyup.13="cariNama"></base-input>
        </div>

      </div>

    </div>
    
    <div class="table-responsive">
      
      <table class="table table-striped table-hover mt--3">
        <thead>
          <tr>
            <th> <h5>No</h5></th>
            <th> <h5>Pelanggan</h5> </th>
            <th> <h5>Tanggal</h5> </th>
            <th> <h5>Menu</h5> </th>
            <th> <h5>Harga</h5> </th>
            <th> <h5>Jumlah</h5> </th>
            <th> <h5>Total</h5> </th>
            <th> <h5>Alamat</h5> </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(results, index) in result" :key="index">
            <td>{{index + 1}}</td>
            <td>{{results.user}}</td>
            <td>{{results.tgl_order}}</td>
            <td>{{results.menu}}</td>
            <td>{{results.harga}}</td>
            <td>{{results.jumlah}}</td>
            <td>{{results.total}}</td>
            <td>{{results.alamat}}</td>
          </tr>
          <tr>
            <td colspan="6"> <h3>Grand Total</h3> </td>
            <td colspan="2"><h3>Rp. {{Intl.NumberFormat(['ban', 'id']).format(grandTotalOrderDetail)}}</h3></td>
          </tr>
        </tbody>

      </table>
    </div>

    

  </div>

  
 
</template>

<script>
import axios from 'axios';

  export default {
    name: 'projects-table',
    
    props: {
      type: {
        type: String
      },
      title: String,
      showCurrent : Boolean
      
    },
    data() {

      return {
        
        search : '',
        tgl_awal : '',
        tgl_akhir : '',
        nama : "",
     
      }
    },
    mounted () {
      
      this.$store.dispatch('orderDetail')
    },
    methods : {
      cariTgl(){
        if(!this.tgl_awal || !this.tgl_akhir){
          this.$swal({
            icon : 'error',
            title : 'Data !',
            text : 'Maaf Data Masih Kosong'
          })
        }else{
          this.$store.dispatch('searchOrderDetail', {
            tgl_awal : this.tgl_awal,
            tgl_akhir : this.tgl_akhir})
          this.result
          
        }
      },
      cariNama(){
        this.$store.dispatch('cariNama', {
          nama : this.nama
        })
        this.result
        this.nama = ''
      }
    },
    computed : {
      grandTotalOrderDetail(){
          return this.$store.getters.totalOrderDetail
        
      },
      result(){
        return this.$store.state.orderDetail
      }
    }
    
  }
</script>
<style>
</style>