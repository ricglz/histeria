import PropTypes from 'prop-types'
import React from 'react'

import logo from '../../images/logo.png'
import styles from './AppBar.css'

class AppBar extends React.PureComponent {
  static propTypes = {
    materialIcon: PropTypes.string,
    title: PropTypes.string,
    transparent: PropTypes.bool,
    onLogoClick: PropTypes.func,
    children: PropTypes.node,
  }

  static defaultProps = {
    materialIcon: null,
    title: null,
    transparent: false,
    onLogoClick: null,
    children: null,
  }

  render() {
    const {
      materialIcon,
      title,
      transparent,
      onLogoClick,
      children,
    } = this.props

    let appBarStyles = styles.appBar
    if (transparent) {
      appBarStyles = appBarStyles.concat(` ${styles.appBarTransparent}`)
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
        <div className={ styles.children }>{ children }</div>
      </div>
    )
  }
}

export default AppBar
