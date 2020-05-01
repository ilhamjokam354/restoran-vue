<template>
    <div>
        <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
           
        </base-header>

       

        <div class="container-fluid">
            <div class="col-md-12 mt--7">
                <card shadow type="secondary" >
                    <div class="table-responsive">
                        <table class="table table-striped table-hover" >
                            <thead>
                                <tr>
                                    <td> <h3>Menu</h3> </td>
                                    <td> <h3>Harga</h3>  </td>
                                    <td> <h3>Jumlah</h3> </td>
                                    <td> <h3>Total</h3> </td>
                                    <td> <h3>Aksi</h3> </td>
                                    
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(results, key) in product " :key="key">
                                    <td>{{results.product.menu}}</td>
                                    <td>Rp. {{Intl.NumberFormat(['ban', 'id']).format(results.product.harga)}}</td>
                                    <td style="display : block;">
                                        <div>
                                            <i class="fas fa-plus-circle" @click="increment(results.product)"></i>

                                            <span class="text-center p-3">{{results.jumlah}}</span>
                                            
                                            <i class="fas fa-minus-circle" @click="decrement(results.product, results.jumlah)" ></i>
                                        </div>
                                    </td>
                                    <td>Rp. {{Intl.NumberFormat(['ban', 'id']).format(results.jumlah * results.product.harga)}}</td>
                                    <td>
                                        <base-dropdown class="dropdown"
                                                    position="right">
                                        <a slot="title" class="btn btn-sm btn-icon-only text-light" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <i class="fas fa-ellipsis-v"></i>
                                        </a>

                                        <template>
                                            
                                            
                                            <a class="dropdown-item" @click="hapusCart(results.product,results.product.menu)" style="text-decoration: none; cursor: pointer;" ><i class="fas fa-trash text-danger"></i>Delete</a>
                                            
                                        </template>
                                        </base-dropdown>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="3"><h2>Grand Total : </h2> </td>
                                    <td colspan="2"><h2>Rp. {{Intl.NumberFormat(['ban', 'id']).format(grandTotal)}}</h2></td>

                                </tr>
                                
                            </tbody>
                        </table>
                    </div>
                    
                    <div class="card-footer d-flex justify-content-end">
                        <router-link to="/kategori" style="margin-right:619px;">
                            <base-button type="secondary" size="sm">
                                <i class="fas fa-arrow-left"></i> Lanjutkan Berbelanja
                            </base-button>

                        </router-link>
                        <base-button type="danger" size="sm" id="button-2" @click="hapusSemuaCart">
                            <i class="fas fa-trash"></i>
                        </base-button>


                        
                        <base-button type="success" size="sm"  @click="checkout(product)">
                            <span id="che">Checkout</span> <span id="loader" style="display:none;"><pulse-loader :loading="loading" :color="color" :size="size"></pulse-loader></span>
                        </base-button>

                     
                        
                        <b-tooltip target="button-2" placement="bottom">
                            Hapus Semua Keranjang
                        </b-tooltip>

                        
                    </div>
                    
                    <div class="justify-content-first">
                        
                    </div>
                    
                </card>    
            </div>
        </div>

    </div>
</template>

<script>
import axios from 'axios'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

export default {
    name : 'beli',
    data(){
        return {
            loading : true,
            color: 'white',
            size: '6px'
        }
    },
    components : {
        PulseLoader
    },
    mounted (){
        
        
    },
    methods : {
        hapusCart(product, menu){
            this.$swal({
                title: 'Yakin?',
                text: "Apakah Yakin Ingin Menghapus Menu " + menu,
                icon : 'warning',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ya',
                cancelButtonText: 'Tidak',
                buttonsStyling: true
            })
            .then(isConfirm => {
                if(isConfirm.value){
                    this.$store.dispatch('hapusCart', product)
                }
            })
        },
        hapusSemuaCart(){
            this.$store.dispatch('hapusSemuaCart')
        },
        increment(e){
            this.$store.dispatch('increment', {
                product : e,
                jumlah : 1
            })
            
        },
        decrement(e, j){
            this.$store.dispatch('decrement', {
                product : e,
                jumlah : 1
            })

            if(j == 1){
                this.$store.dispatch('hapusCart', e)
            }
        },
        checkout(p){
            let che = document.getElementById('che')
            let loader = document.getElementById('loader')
            che.style.display = 'none'
            loader.style.display = "block"
            if(this.product == 0){
                this.$swal({
                    icon : 'warning',
                    title : 'Maaf !',
                    text : 'Keranjang Belanja Anda Masih Kosong'
                })
                loader.style.display = 'none'
                che.style.display = "block"
            }else{
                
                this.insertInOrders(p)
                this.insertInOrderDetail(p)
                
                
            }
        },
        insertInOrders(p){
            let token = localStorage.getItem('token')
            let d = new Date();
            
            axios.post('http://localhost:1000/order', {
                id_user : localStorage.getItem('id_user'),
                tgl_order : d.getFullYear()+'-'+(d.getMonth() + 1)+'-'+d.getDate(),
                total : this.grandTotal,
                bayar : 0,
                kembali : 0,
                status : 0
            }, {
                headers : {
                    Authorization: 'Bearer ' + token
                }
            })
            .then(response => {
                localStorage.setItem('id_order', response.data.data.id_order)
                this.insertInOrderDetail(p, response.data.data.id_order)
            })
            .catch(err => {
                console.log(err)
            })
                
                
        },
        insertInOrderDetail(p, id){
            let token = localStorage.getItem('token')
            let idorder = localStorage.getItem('id_order')
            for(let i = 0; i <= p.length; i++ ){
                
                axios.post('http://localhost:1000/order_detail', {
                    id_order : parseInt(id),
                    id_menu : p[i].product.id_menu,
                    jumlah  : p[i].jumlah,
                    harga_jual : p[i].product.harga

                }, {
                    headers : {
                        Authorization: 'Bearer ' + token
                    }
                })
                .then(() => {
                    this.$store.dispatch('hapusSemuaCart', p)
                    this.$router.push('/kategori/beli/checkout')
                }).catch(() => {
                    
                })

                
            }
        }
    },
    computed : {
        product () {
            return this.$store.state.cart
        },
        grandTotal(){
            return this.$store.getters.grandTotal
        }
    }
}
</script>