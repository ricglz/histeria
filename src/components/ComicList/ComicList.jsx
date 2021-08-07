import PropTypes from 'prop-types'
import React from 'react'

import AppBar from '../AppBar'
import ComicItem from '../ComicItem'
import SearchBarContainer from '../SearchBar'

import banner from '../../images/banner.jpg'
import styles from './ComicList.css'

class ComicList extends React.PureComponent {
  static propTypes = {
    comics: PropTypes.array,
    isFetching: PropTypes.bool,
    fetchError: PropTypes.bool,
    onComicItemClick: PropTypes.func,
  }

  static defaultProps = {
    comics: [],
    isFetching: false,
    fetchError: false,
    onComicItemClick: null,
  }

  render() {
    const {
      comics,
      fetchError,
      isFetching,
      onComicItemClick,
    } = this.props

    return (
      <div>
        <AppBar>
          <SearchBarContainer />
        </AppBar>
        {
          (() => {
            if (isFetching && comics.length <= 1) {
              return (
                <div className={ styles.statusPage }>
                  <i className="loading-spinner" />
                </div>
              )
            } else if (fetchError && comics.length === 0) {
              return (
                <div className={ styles.statusPage }>
                  <div>
                    <i className="material-icons">sentiment_very_dissatisfied</i>
                    <h2>Unable to find comics</h2>
                  </div>
                </div>
              )
            }

            return (
              <div className={ styles.footerContainer }>
                <div className={ styles.container }>
                  <div className={ styles.banner }>
                    <img alt="Website banner" src={ banner } />
                  </div>
                  <div className={ styles.comicList }>
                    <div className={ styles.comicListInner }>
                      {
                        comics.map(comic => (
                          <ComicItem
                            key={ comic.id }
                            comic={ comic }
                            onClick={ onComicItemClick }
                          />
                        ))
                      }
                    </div>
                  </div>
                </div>
                <footer className={ styles.footer }>
                  <span>Derechos reservados del autor</span>
                </footer>
              </div>
            )
          })()
        }
      </div>
    )
  }
}

export default ComicList
