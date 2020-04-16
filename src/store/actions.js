import axios from 'axios'

export const getProductAll = ({commit}) => {
    axios.get('http://localhost:1000/pelanggan/menu')
    .then(response => {
        commit('SET_PRODUCT', response.data.data)
        commit('SET_NEXT_PAGE', response.data.next_page_url)
        commit('SET_PREV_PAGE', response.data.prev_page_url)
        commit('SET_CURRENT_PAGE', response.data.current_page)
    })
}

export const addToCartProduct = ({commit}, {product, jumlah}) => {
    commit('ADD_TO_CART', {product, jumlah})

}

export const hapusCart = ({commit}, product) => {
    commit ('HAPUS_CART', product)
}


export const hapusSemuaCart = ({commit}) =>{
    commit('HAPUS_SEMUA_CART')
}

export const increment = ({commit}, {product, jumlah}) => {
    commit('INCREMENT', {product, jumlah})
}

export const decrement = ({commit}, {product, jumlah}) => {
    commit('DECREMENT', {product, jumlah})
}

export const orderDetail = ({commit}) => {
    let token = localStorage.getItem('token')
    axios.get('http://localhost:1000/vorderdetail', {
        headers : {
            Authorization : `Bearer ${token}`
        }
    })
    .then(response => {
        commit('SET_ORDER_DETAIL', response.data)
    })
}

export const searchOrderDetail = ({commit}, {tgl_awal, tgl_akhir}) => {
    let token = localStorage.getItem('token')
    axios.get(`http://localhost:1000/search/vorderdetail/tgl_order/${tgl_awal}/${tgl_akhir}`, {
    headers : {
        Authorization : `Bearer ${token}`
    }
    })
    .then(response => {
        commit('SET_SEARCH_ORDER_DETAIL', response.data)
    })
}

export const cariNama = ({commit}, {nama}) => {
    let token = localStorage.getItem('token')
    axios.get(`http://localhost:1000/search/vorderdetail/${nama}`, {
        headers : {
        Authorization : `Bearer ${token}`
        }
    })
    .then(response => {
        commit('SET_NAMA', response.data)
    })
}