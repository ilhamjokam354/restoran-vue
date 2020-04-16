<template>
    <div>
        <base-header type="gradient-info" class="pb-6 pb-8 pt-5 pt-md-8">
            
        </base-header>


        <div class="container">
            <div class="col-md-8 mt--5">
                <card shadow type="secondary">
                     <div slot="header" class="bg-white border-0">
                            <div class="row align-items-center">
                                
                                
                            </div>
                    </div>
                    <div class="col-md-8">
                        
                        
                        
                            <div class="md-layout-item">
                                
                                <md-field class="mt-3">
                                    <label for="font">Kategori</label>
                                    <md-select v-model="model.id_kategori" required name="font" @click="ambilKategori" id="font">
                                        <md-option :value="kategoris.id_kategori" v-for="(kategoris, key) in kategori" :key="key" >{{kategoris.kategori}}</md-option>
                                        
                                    </md-select>
                                </md-field>
                               
                            </div>
                            
                            
                            <base-input label="Menu" placeholder="Menu" v-model="model.menu"></base-input>
                            <base-input label="Gambar" type="file"  @change="onSelectedFile" ></base-input>
                            <!-- <input type="file"  class="mb-3"> -->
                            <base-input label="Harga" placeholder="Harga" v-model="model.harga"></base-input>
                            <base-button type="primary" size="sm" @click="onUpload">Simpan</base-button>
                        
                    </div>  
                </card>
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
            result : '',
            file : '',
            files : [],
            kategori : '',
            model : {
                id_kategori : '',
                menu : '',
                gambar : '',
                harga : ''
                
            }
        }
        
    },
    mounted(){
        let token = localStorage.getItem('token')
        let level = localStorage.getItem('level')
        if(!token){
        this.$router.push('/admin/login')
        }else if(!level){
        this.$router.push('/dashboard')
        }
    },
    methods : {
        onSelectedFile(event){
            this.file = event.target.files[0]
        },
        onUpload(){
            const fd = new FormData()
            fd.append('id_kategori', this.model.id_kategori)
            fd.append('menu', this.model.menu)
            fd.append('gambar', this.file, this.file.name)
            fd.append('harga', this.model.harga)
            let token = localStorage.getItem('token')
            axios.post('http://localhost:1000/menu',fd , {
                headers : {
                    Authorization: 'Bearer ' + token
                }
            })
            .then(response => {
                this.$swal({
                    icon : 'success',
                    title : 'Tambah Data',
                    text : 'Tambah Data Berhasil'
                })
                .then(result => {
                    if(result.value){
                        this.$router.push('/admin/menu')
                        
                    }
                })
                
                
            })
            .catch((err) => {
                this.$swal({
                    icon : 'error',
                    title : 'Tambah Data',
                    text : 'Tambah Data Gagal'
                })
                .then(result => {
                    if(result.value){
                        this.$router.push('/admin/tambah/menu')

                    }
                })
            })
            
        },
        ambilKategori(){
            let token = localStorage.getItem('token')
            axios.get('http://localhost:1000/kategori', {
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
        }
    }

  };
</script>
<style scoped>
    
</style>
