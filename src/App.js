import {Component} from 'react'
import Home from './Component/Home'
import CartContext from './context/CartContext'
import './App.css'

class App extends Component {
  state = {cartList: [], cartId: ''}

  addCartItem = item => {
    this.setState(prevState => ({cartList: [...prevState.cartList, item]}))
  }

  deleteCartItem = (id, dishCount) => {
    console.log(id)
    console.log(dishCount)
    const {cartList} = this.state
    const filteredData = cartList.filter(
      each => each.count !== dishCount - 1 && each.dishId !== id,
    )
    const a = cartList.map(
      each => each.count !== dishCount && each.dishId !== id,
    )
    console.log(a)
    this.setState({cartList: filteredData})
    console.log(filteredData)
  }

  getCartId = dishId => {
    this.setState({cartId: dishId})
  }

  render() {
    const {cartList, cartId, totalCount} = this.state
    console.log(cartList)
    return (
      <CartContext.Provider
        value={{
          cartList,
          cartId,
          totalCount,
          addCartItem: this.addCartItem,
          deleteCartItem: this.deleteCartItem,
          getCartId: this.getCartId,
        }}
      >
        <Home />
      </CartContext.Provider>
    )
  }
}
export default App
