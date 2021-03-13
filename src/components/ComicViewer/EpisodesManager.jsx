import PropTypes from 'prop-types'
import React from 'react'

import FlatButton from '../FlatButton'

import styles from './ComicViewer.css'

class EpisodeManager extends React.PureComponent {
  static propTypes = {
    prevEpisode: PropTypes.object,
    nextEpisode: PropTypes.object,
    onPrevEpisodeClick: PropTypes.func,
    onNextEpisodeClick: PropTypes.func,
  }

  static defaultProps = {
    prevEpisode: null,
    nextEpisode: null,
    onPrevEpisodeClick: null,
    onNextEpisodeClick: null,
  }

  render() {
    const {
      prevEpisode, nextEpisode, onPrevEpisodeClick, onNextEpisodeClick,
    } = this.props

    return (
      <div className={ styles.center }>
        <div className={ styles.managerRow }>
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
      </div>
    )
  }
}

export default EpisodeManager
