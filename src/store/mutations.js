import state from "./state";

export const SET_PRODUCT = (state, products) => {
    state.products = products
}

export const SET_NEXT_PAGE = (state, next_page) => {
    state.next_page = next_page
}

export const SET_PREV_PAGE = (state, prev_page) => {
    state.prev_page = prev_page
}

export const SET_CURRENT_PAGE = (state, current_page) => {
    state.current_page = current_page
}

export const ADD_TO_CART = (state, {product, jumlah}) => {

    let productInCart = state.cart.find(item => {
        return item.product.id_menu === product.id_menu

    })
    if(productInCart){
        productInCart.jumlah += jumlah
        return;
    }

    state.cart.push({
        product,
        jumlah
    })
}

export const HAPUS_CART = (state, product) => {
    state.cart = state.cart.filter(item => {
        return item.product.id_menu != product.id_menu
    })
}

export const HAPUS_SEMUA_CART = (state) => {
    state.cart = []
}

export const INCREMENT = (state, {product, jumlah}) => {
    let productInCart = state.cart.find(item => {
        return item.product.id_menu === product.id_menu

    })
    if(productInCart){
        productInCart.jumlah += jumlah
        return;
    }

    state.cart.push({
        jumlah
    })
}

export const DECREMENT = (state, {product, jumlah}) => {
    let productInCart = state.cart.find(item => {
        return item.product.id_menu === product.id_menu

    })
    if(productInCart){
        productInCart.jumlah -= jumlah
        return;
    }

    state.cart.splice({
        jumlah
    })
}

export const SET_ORDER_DETAIL = (state, orderdetail) => {
    state.orderDetail = orderdetail
}

export const SET_SEARCH_ORDER_DETAIL = (state, orderdetail) => {
    state.orderDetail = orderdetail
}

export const SET_NAMA = (state, orderdetail) => {
    state.orderDetail = orderdetail
}