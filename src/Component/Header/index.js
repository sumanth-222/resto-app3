import {IoMdCart} from 'react-icons/io'
import CartContext from '../../context/CartContext'
import './index.css'

const Header = props => {
  const {restaurantName} = props

  const renderCartItemsCount = () => (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value
        const cartItemsCount = cartList.length
        return (
          <>
            {cartItemsCount > 0 ? (
              <span className="cart-count">{cartList.length}</span>
            ) : null}
          </>
        )
      }}
    </CartContext.Consumer>
  )

  return (
    <div className="header-container">
      <h1 className="website-name">{restaurantName}</h1>
      <div className="orders">
        <p className="order">My Orders</p>
        <IoMdCart className="cart-icon" />
        {renderCartItemsCount()}
      </div>
    </div>
  )
}
export default Header
