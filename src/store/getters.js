import state from "./state";

export const cartItemCount = (state) => {
    return state.cart.reduce((total, item) => {
        total += item.jumlah;
        return total
      }, 0)
}

export const grandTotal = (state) => {
    let total = 0
    state.cart.forEach(item => {
        total += item.product.harga * item.jumlah
    })
    return total
}

export const totalOrderDetail = (state) => {
    let total = 0
    state.orderDetail.forEach(item => {
        total += item.total
    })
    return total
}