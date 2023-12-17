import {Component} from 'react'
import CartContext from '../../context/CartContext'
import './index.css'

class Item extends Component {
  /* renderCartItemsCount = () => (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value
        const cartItemsCount = cartList.length
        return (
          <>
            {cartItemsCount > 0 ? (
              <span className="cart-count-badge">{cartList.length}</span>
            ) : null}
          </>
        )
      }}
    </CartContext.Consumer>
  ) */

  renderItem = () => (
    <CartContext.Consumer>
      {value => {
        const {addCartItem, deleteCartItem} = value
        const {categoryList, updating, deleting} = this.props
        const onAddItem = id => {
          const filterCart = categoryList.filter(each => each.dishId === id)
          addCartItem(...filterCart)
          updating(id)
        }

        const decrease = (dishId, dishCount) => {
          deleteCartItem(dishId, dishCount)
          deleting(dishId.toString(), Number(dishCount) - 1)
        }

        return (
          <div>
            {categoryList.map(item => (
              <li className="item-container" key={item.dishId}>
                <div className="item-details">
                  <h1 className="dish-name">{item.dishName}</h1>
                  <p className="currency-type">{item.dishCurrency}</p>
                  <p>{item.dishPrice}</p>
                  <p className="description">{item.dishDescription}</p>
                  {item.dishAvailability ? (
                    <div className="button-card">
                      <button
                        className="btn"
                        type="button"
                        onClick={() => decrease(item.dishId, item.count)}
                      >
                        -
                      </button>
                      <p className="count">{item.count}</p>
                      <button
                        className="btn"
                        type="button"
                        onClick={() => onAddItem(item.dishId)}
                      >
                        +
                      </button>
                    </div>
                  ) : null}
                  {item.dishAvailability ? (
                    <button type="button">Add</button>
                  ) : (
                    <p className="not-available">Not Available</p>
                  )}
                  {item.addOnCat.length >= 1 ? (
                    <p className="customize">Customizations available</p>
                  ) : null}
                </div>
                <div className="image-card">
                  <p className="calories">{item.dishCalories} Calories</p>
                  <img src={item.dishImage} className="image" alt="Dish" />
                </div>
              </li>
            ))}
          </div>
        )
      }}
    </CartContext.Consumer>
  )

  render() {
    return <div>{this.renderItem()}</div>
  }
}

export default Item
