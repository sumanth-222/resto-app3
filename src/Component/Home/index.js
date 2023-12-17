import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import MenuCategory from '../MenuCategory'
import CartContext from '../../context/CartContext'
import Item from '../Item'

import './index.css'

class Home extends Component {
  state = {
    menuCategories: [],
    categoryItem: [],
    isLoading: true,
    restaurantName: '',
    TotalCount: 0,
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const url = 'https://run.mocky.io/v3/77a7e71b-804a-4fbd-822c-3e365d3482cc'
    const options = {
      method: 'GET',
    }

    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()

      const restoName = data[0].restaurant_name
      const menuGenre = data[0].table_menu_list.map(each => ({
        menuCategory: each.menu_category,
        menuCategoryId: each.menu_category_id,
        categoryList: each.category_dishes,
      }))
      console.log(data)
      const category = menuGenre.filter(each => each.menu_category_id === 11)
      this.setState({
        menuCategories: menuGenre,
        categoryItem: category,
        restaurantName: restoName,
        isLoading: false,
      })
    } else {
      this.setState({isLoading: true})
    }
  }

  getMenuCategoryId = async id => {
    const menuCategories = this.state
    const category = menuCategories.menuCategories.filter(
      each => each.menuCategoryId === id,
    )

    const updatedData = await category[0].categoryList.map(each => ({
      addOnCat: each.addonCat,
      dishAvailability: each.dish_Availability,
      dishCalories: each.dish_calories,
      dishCurrency: each.dish_currency,
      dishDescription: each.dish_description,
      dishImage: each.dish_image,
      dishPrice: each.dish_price,
      nextUrl: each.nxturl,
      dishId: each.dish_id,
      dishName: each.dish_name,
      count: 0,
    }))

    this.setState({categoryItem: updatedData})
  }

  totalCount = count => {
    this.setState({TotalCount: count})
  }

  updatingWithId = id => {
    this.setState(prevState => {
      const updatedDishes = prevState.categoryItem.map(dish => {
        if (dish.dishId === id) {
          return {...dish, count: dish.count + 1}
        }
        return dish
      })

      return {categoryItem: updatedDishes}
    })
  }

  deletingWithId = (id, dishCount) => {
    if (dishCount >= 1) {
      this.setState(prevState => {
        const updatedDishes = prevState.categoryItem.map(dish => {
          if (dish.dishId === id) {
            return {...dish, count: dish.count - 1}
          }
          return dish
        })

        return {categoryItem: updatedDishes}
      })
    }
  }

  renderHome = () => (
    <CartContext.Consumer>
      {value => {
        const {
          menuCategories,
          categoryItem,
          isLoading,
          restaurantName,
          TotalCount,
        } = this.state
        const {totalCount} = value
        console.log(totalCount)
        return (
          <div className="main">
            {isLoading ? (
              <div>
                <Loader
                  type="Oval"
                  color="blue"
                  height={50}
                  width={50}
                  className="loader"
                />
              </div>
            ) : (
              <div className="Home-container">
                <Header
                  restaurantName={restaurantName}
                  cartCount={TotalCount}
                />
                <ul className="categories-list">
                  {menuCategories.map(each => (
                    <MenuCategory
                      menuCategories={each}
                      key={each.menuCategoryId}
                      getMenuCategoryId={this.getMenuCategoryId}
                    />
                  ))}
                </ul>

                <ul>
                  <Item
                    categoryList={categoryItem}
                    totalCount={this.totalCount}
                    updating={this.updatingWithId}
                    deleting={this.deletingWithId}
                  />
                  ))
                </ul>
              </div>
            )}
          </div>
        )
      }}
    </CartContext.Consumer>
  )

  render() {
    return <div>{this.renderHome()}</div>
  }
}
export default Home
