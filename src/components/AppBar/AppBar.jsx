import PropTypes from 'prop-types'
import React from 'react'
import { SocialIcon } from 'react-social-icons'

import logo from '../../images/logo.png'
import styles from './AppBar.css'

class AppBar extends React.PureComponent {
  static propTypes = {
    transparent: PropTypes.bool,
    onLogoClick: PropTypes.func,
    children: PropTypes.node,
  }

  static defaultProps = {
    transparent: false,
    onLogoClick: null,
    children: null,
  }

  render() {
    const {
      transparent,
      onLogoClick,
      children,
    } = this.props

    let appBarStyles = styles.appBar
    if (transparent) {
      appBarStyles += ` ${styles.appBarTransparent}`
    }

    return (
      <div className={ appBarStyles }>
        <div
          className={ styles.logo }
          role="button"
          tabIndex="0"
          onClick={ onLogoClick }
          onKeyPress={ onLogoClick }
        >
          <img src={ logo } alt="Logo Histeria" />
        </div>
        <div className={ styles.children }>
          <div className={ styles.icons }>
            <SocialIcon
              url="https://www.instagram.com/plumanolo/"
              bgColor="#1c1f2b"
              fgColor="#ddd"
              style={ { height: 35, width: 35 } }
            />
            <SocialIcon
              url="https://www.tiktok.com/@plumanolo"
              bgColor="#1c1f2b"
              fgColor="#ddd"
              style={ { height: 35, width: 35 } }
            />
          </div>
          { children }
        </div>
      </div>
    )
  }
}

export default AppBar
