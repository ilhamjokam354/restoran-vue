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
                        <base-input label="Bayar Sebelumnya" :placeholder="bayar" readonly  ></base-input>
                        <base-input label="Kembali Sebelumnya" :placeholder="kembali" readonly ></base-input>
                        <base-input label="Bayar Sekarang" placeholder="Bayar" v-model="bayarSekarang" ></base-input>
                        <base-button type="primary" size="sm" @click="bayarHutang">Simpan</base-button>
                        
                    </div>  
                </card>
            </div>


        </div>
        

    </div>
</template>

<script>
import axios from 'axios'

export default {
    name : 'hutang',
    data(){
        return {
            total : '',
            bayar : '',
            kembali : '',
            bayarSekarang : ''
        }
    },
    mounted (){
        this.ambilHutang()
    },
    methods : {
        ambilHutang(){
            let token = localStorage.getItem('token')
            axios.get(`http://localhost:1000/order/${this.$route.params.id}`, {
                headers : {
                    Authorization : `Bearer ${token}`
                }
            })
            .then(response => {
                this.total = response.data.data.total
                this.bayar = response.data.data.bayar
                this.kembali = response.data.data.kembali

            })

        },
        bayarHutang(){
            let token = localStorage.getItem('token')
            if(this.bayarSekarang == ''){
                this.$swal({
                    icon : 'error',
                    title : 'Data !',
                    text : 'Masih Kosong !'
                })
            }else{
                axios.put(`http://localhost:1000/order/${this.$route.params.id}`,{
                    bayar  : parseInt(this.bayar) + parseInt(this.bayarSekarang),
                    kembali : parseInt(this.kembali) + parseInt(this.bayarSekarang) 
                }, {
                    headers : {
                        Authorization : `Bearer ${token}`
                    }
                })
                .then(response => {
                    this.$swal({
                        icon : 'success',
                        title : 'Data !',
                        text : 'Berhasil Di Update'
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
}
</script>