<template>
    <div>
        <base-header type="gradient-danger" class="pb-6 pb-8 pt-5 pt-md-8">
            
        </base-header>


        <div class="container">
            <div class="col-md-8 mt--5">
                <card shadow type="secondary">
                     <div slot="header" class="bg-white border-0">
                            <div class="row align-items-center">
                                
                                
                            </div>
                    </div>
                    <div class="col-md-8">
                        <form action="" >
                            <base-input label="Kategori" :placeholder="model.kategori" v-model="model.kategori"></base-input>
                            <base-button type="primary" class="primary" size="sm" @click="updateKategori(id)">Simpan</base-button>
                        </form>
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
            model : {
                
                kategori : ''
            }
        }
        
    },
    mounted () {
        this.id = this.$route.params.id
        this.ambilData(this.id)
        let token = localStorage.getItem('token')
        let level = localStorage.getItem('level')
        if(!token){
            this.$router.push('/admin/login')
        }else if(!level){
            this.$router.push('/dashboard')
        }

    },
    methods : {
        ambilData(id){
            let token = localStorage.getItem('token')
            axios.get(`http://localhost:1000/kategori/${id}`, {
                headers : {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(response => {
                const {kategori} = response.data.data
                this.model.kategori = kategori

            })
            .catch(err => {
                console.log(err)
            })
        },
        updateKategori(id){
            let token = localStorage.getItem('token')
            axios.put(`http://localhost:1000/kategori/${id}`,this.model, {
                headers : {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(response => {
                this.$swal({
                    icon : 'success',
                    title : 'Update Data',
                    text : response.data.message

                })
                .then(result => {
                    if(result.value){
                        this.$router.push('/admin/kategori')
                    }
                })
                // console.log(response)
                
            })
            .catch(err => {
                this.$swal({
                    icon : 'error',
                    title : 'Update Data',
                    text : err.data.message
                })
            })
        }
    }

  };
</script>
<style scoped>
    
</style>
