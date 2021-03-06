import PropTypes from 'prop-types'
import React from 'react'

import AppBar from '../AppBar'
import FlatButton from '../FlatButton'

import styles from './ComicViewer.css'

class ComicViewer extends React.PureComponent {
  static propTypes = {
    pages: PropTypes.array,
    episode: PropTypes.object,
    isFetching: PropTypes.bool,
    fetchError: PropTypes.bool,
    prevEpisode: PropTypes.object,
    nextEpisode: PropTypes.object,
    onPrevEpisodeClick: PropTypes.func,
    onNextEpisodeClick: PropTypes.func,
    onBackClick: PropTypes.func,
  }

  static defaultProps = {
    pages: [],
    episode: {},
    isFetching: false,
    fetchError: false,
    prevEpisode: null,
    nextEpisode: null,
    onPrevEpisodeClick: null,
    onNextEpisodeClick: null,
    onBackClick: null,
  }

  render() {
    const {
      pages,
      episode,
      isFetching,
      fetchError,
      prevEpisode,
      nextEpisode,
      onPrevEpisodeClick,
      onNextEpisodeClick,
      onBackClick,
    } = this.props

    return (
      <div className={ styles.comicViewer }>
        <AppBar materialIcon="arrow_back" onLogoClick={ onBackClick } transparent />
        {
          (() => {
            if (isFetching) {
              return (
                <div className={ styles.statusPage }>
                  <i className="loading-spinner" />
                </div>
              )
            } else if (fetchError) {
              return (
                <div className={ styles.statusPage }>
                  <div>
                    <i className="material-icons">sentiment_very_dissatisfied</i>
                    <h2>Unable to find comic</h2>
                  </div>
                </div>
              )
            }

            return (
              <div>
                <div className={ styles.title }>
                  { episode.title }
                </div>
                {
                  prevEpisode && (
                    <FlatButton
                      materialIcon="chevron_left"
                      extraStyles={ styles.episodeButton }
                      title={ prevEpisode.title }
                      onClick={ onPrevEpisodeClick }
                    />
                  )
                }
                {
                  nextEpisode && (
                    <FlatButton
                      materialIcon="chevron_right"
                      extraStyles={ styles.episodeButton }
                      title={ nextEpisode.title }
                      onClick={ onNextEpisodeClick }
                    />
                  )
                }
                <div className={ styles.pages }>
                  {
                    pages.map(page => (
                      <img
                        key={ page }
                        className={ styles.img }
                        src={ page }
                        alt={ page }
                      />
                    ))
                  }
                </div>
                {
                  prevEpisode && (
                    <FlatButton
                      materialIcon="chevron_left"
                      extraStyles={ styles.episodeButton }
                      title={ prevEpisode.title }
                      onClick={ onPrevEpisodeClick }
                    />
                  )
                }
                {
                  nextEpisode && (
                    <FlatButton
                      materialIcon="chevron_right"
                      extraStyles={ styles.episodeButton }
                      title={ nextEpisode.title }
                      onClick={ onNextEpisodeClick }
                    />
                  )
                }
              </div>
            )
          })()
        }
      </div>
    )
  }
}

export default ComicViewer
