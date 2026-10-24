import {Component} from 'react'
import {Link} from 'react-router-dom'

import './index.css'

class Header extends Component {
  state = {activeStatus: false}

  onClickMenuButton = () => {
    this.setState(prevState => ({
      activeStatus: !prevState.activeStatus,
    }))
  }

  onClickNavLink = () => {
    this.setState({activeStatus: false})
  }

  render() {
    const {activeStatus} = this.state

    return (
      <div className="container">
        <div data-testid="header" className="repo-item">
          <nav className="header-container">
            <Link
              to="/"
              className="heading-nav-link"
              onClick={this.onClickNavLink}
            >
              <img
                src="https://res.cloudinary.com/ddsn9feta/image/upload/v1718691523/menu_l33xs7.png"
                alt="gitHub profile visualizer home page"
              />
              <h1 className="header-heading">GitHub Profile Visualizer</h1>
            </Link>

            <button
              className="menu-button"
              type="button"
              onClick={this.onClickMenuButton}
              aria-label="Toggle navigation menu"
            >
              <img
                src="https://res.cloudinary.com/ddsn9feta/image/upload/v1718691523/menu_l33xs7.png"
                alt="menu"
                className="menuSize"
              />
            </button>

            <ul className="items-nav">
              <li>
                <Link
                  to="/"
                  className="item-nav-link"
                  onClick={this.onClickNavLink}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/repositories"
                  className="item-nav-link"
                  onClick={this.onClickNavLink}
                >
                  Repositories
                </Link>
              </li>
              <li>
                <Link
                  to="/analysis"
                  className="item-nav-link"
                  onClick={this.onClickNavLink}
                >
                  Analysis
                </Link>
              </li>
            </ul>
          </nav>

          {activeStatus && (
            <nav>
              <ul className="nav-items-container">
                <li>
                  <Link
                    to="/"
                    className="item-link"
                    onClick={this.onClickNavLink}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/repositories"
                    className="item-link"
                    onClick={this.onClickNavLink}
                  >
                    Repositories
                  </Link>
                </li>
                <li>
                  <Link
                    to="/analysis"
                    className="item-link"
                    onClick={this.onClickNavLink}
                  >
                    Analysis
                  </Link>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </div>
    )
  }
}

export default Header
