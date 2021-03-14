import PropTypes from 'prop-types'
import React from 'react'

import styles from './ComicItem.css'

class ComicItem extends React.PureComponent {
  static propTypes = {
    comic: PropTypes.object,
    onClick: PropTypes.func,
  }

  static defaultProps = {
    comic: {},
    onClick: null,
  }

  onComicItemClick = () => {
    const { comic, onClick } = this.props
    if (onClick) {
      onClick(comic.id)
    }
  }

  render() {
    const { comic } = this.props

    return (
      <div
        className={ styles.comic }
        role="button"
        tabIndex="0"
        onClick={ this.onComicItemClick }
        onKeyPress={ this.onComicItemClick }
      >
        <img className={ styles.img } src={ comic.coverUrl } alt="cover" />
        <div className={ styles.comicDescription }>
          <span>{ comic.title }</span>
          <div className={ styles.views }>
            { comic.views }
            <i className="material-icons">visibility</i>
          </div>
        </div>
      </div>
    )
  }
}

export default ComicItem
