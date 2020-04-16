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
                                    <md-select v-model="model.id_kategori" required name="font"  id="font">
                                        <md-option :value="kategoris.id_kategori" v-for="(kategoris, key) in kategori " :key="key">{{kategoris.kategori}}</md-option>
                                        
                                    </md-select>
                                </md-field>
                               
                            </div>
                            <base-input label="Menu" :placeholder="model.menu" v-model="model.menu"></base-input>
                            <base-input label="Gambar" type="file" @change="onSelectedFile" ></base-input>
                            <base-input label="Harga" :placeholder="model.harga" v-model="model.harga"></base-input>
                            <base-button type="primary" class="primary" size="sm" @click="updateMenu(id)">Simpan</base-button>
                        
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
            id : '',
            kategori : '',
            selectedIdKategori : '',
            model : {
                id_kategori : '',
                menu : '',
                gambar : '',
                harga : ''
            }
        }
        
    },
    mounted () {
        this.id = this.$route.params.id
        this.ambilData(this.id)
        this.ambilKategori()
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
            this.model.gambar = event.target.files[0]
        },
        ambilKategori(){
            let token = localStorage.getItem('token')
            axios.get('http://localhost:1000/kategori', {
                headers : {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(response => {
                this.kategori = response.data.data
            })
        },
        
        ambilData(id){
            let token = localStorage.getItem('token')
            axios.get(`http://localhost:1000/menu/${id}`, {
                headers : {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(response => {
                // console.log(response)
                const {menu, gambar, harga, } = response.data.data
                this.model.menu = menu
                this.model.gambar = gambar
                this.model.harga = harga
                this.model.id_kategori = response.data.data.id_kategori
            })
            .catch(err => {
                console.log(err)
            })
        },
        updateMenu(id){
            let token = localStorage.getItem('token')
            let fd = new FormData()
            
            
            fd.append('id_kategori', this.model.id_kategori)
            fd.append('menu', this.model.menu)
            fd.append('gambar', this.model.gambar)
            fd.append('harga', this.model.harga)
            
            
            axios.post(`http://localhost:1000/menu/${id}`,fd, {
                headers : {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(response => {
                // console.log(response)
                this.$swal({
                    icon : 'success',
                    title : 'Ubah Data',
                    text : response.data.message
                })
                .then(result => {
                    if(result.value == true){
                        this.$router.push('/admin/menu')

                    }
                })
            })
            .catch(err => {
                this.$swal({
                    icon : 'error',
                    title : 'Ubah Data',
                    text : 'Ubah Data Gagal'
                })
            })
        }
    }

  };
</script>
<style scoped>
    
</style>
