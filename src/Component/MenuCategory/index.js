import {Component} from 'react'
import './index.css'

class MenuCategory extends Component {
  getId = () => {
    const {getMenuCategoryId, menuCategories} = this.props
    const {menuCategoryId} = menuCategories
    getMenuCategoryId(menuCategoryId)
  }

  render() {
    const {menuCategories} = this.props
    const {menuCategory, menuCategoryId} = menuCategories

    return (
      <li className="category-container">
        <button
          type="button"
          key={menuCategoryId}
          className="menu-category"
          onClick={this.getId}
        >
          {menuCategory}
        </button>
      </li>
    )
  }
}

export default MenuCategory
