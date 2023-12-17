import React from 'react'

const CartContext = React.createContext({
  cartList: [],
  addCartItem: () => {},
  deleteCartItem: () => {},
  getCartId: () => {},
  cartId: '',
  totalCount: 0,
})

export default CartContext
