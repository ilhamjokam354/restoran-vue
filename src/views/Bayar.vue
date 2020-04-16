<template>
    <div>
        <base-header type="gradient-warning" class="pb-6 pb-8 pt-5 pt-md-8">
            
        </base-header>


        <div class="container">
            <div class="col-md-8 mt--7">
                <card shadow type="secondary">
                     <div slot="header" class="bg-white border-0">
                        <div class="row align-items-center">
                            
                            
                        </div>
                    </div>
                    <div class="col-md-8">
                            
                        <base-input label="Total" :placeholder="total" readonly></base-input>
                        <base-input label="Bayar" placeholder="Bayar" v-model="model.bayar" ></base-input>
                        <base-button type="primary" size="sm" @click="bayar">Simpan</base-button>
                        
                    </div>  
                </card>
            </div>


        </div>
        

    </div>
</template>

<script>
import axios from 'axios';

    export default {
        name : 'bayar',
        data () {
            return {
                id : "",
                total : "",
                model : {
                    bayar : '',
                    

                }
            }
        },
        mounted () {
            let id = this.$route.params.id
            this.ambilData(id)
            this.bayar(id)
        },
        methods : {
            ambilData(id){
                let token = localStorage.getItem('token');
                axios.get(`http://localhost:1000/order/${id}`, {
                    headers : {
                        Authorization: `Bearer ${token}`
                    }
                })
                .then(response => {
                    this.total = response.data.data.total
                })

                
            },
            bayar(){
                let token = localStorage.getItem('token')
                
                axios.put(`http://localhost:1000/order/${this.$route.params.id}`,{
                    bayar : this.model.bayar,
                    kembali : this.model.bayar - this.total,
                    status : 1
                }, {
                    headers : {
                        Authorization: `Bearer ${token}`
                    }
                })
                .then(response => {
                    // console.log(response)
                    this.$swal({
                        icon : 'success',
                        title : 'Data !',
                        text : response.data.message
                    })
                    .then(isConfirm => {
                        if(isConfirm.value){
                            this.$router.push('/admin/order')
                        }
                    })
                })
            }
           

        }
    }
</script>