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
                        <form action="" method="post">
                            <base-input label="Kategori" placeholder="Kategori" v-model="model.kategori"></base-input>
                            <base-button type="primary" size="sm" @click="tambahKategori">Simpan</base-button>
                        </form>
                    </div>  
                </card>
            </div>


        </div>
        

    </div>
</template>
<script>

  export default {
    name: 'tables',
    
    data (){
        return {
            result : '',
            model : {
                kategori : ''
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
        tambahKategori(){
            let token = localStorage.getItem('token')
            axios.post('http://localhost:1000/kategori',this.model, {
                headers : {
                Authorization: 'Bearer ' + token
            }
            })

            .then(response => {
                this.$swal({
                    icon : 'success',
                    title : 'Tambah Data',
                    text : response.data.message
                })
                .then(result => {
                    if(result.value){
                        this.$router.push('/admin/kategori')
                    }
                })
               
                
            })
            .catch(err => {
                this.$swal({
                    icon : 'error',
                    title : 'Tambah Data',
                    text : response.data.message
                })
            })
        }
    }

  };
</script>
<style scoped>
    
</style>
