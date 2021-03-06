import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import ComicViewer from './ComicViewer'

import Actions from '../../actions'
import { App } from '../../constants'

class ComicViewerContainer extends React.Component {
  static defaultProps = {
    comicId: 0,
    comic: {},
    episodeId: 0,
    episodes: {},
    pages: {},
    push: null,
    fetchComic: null,
    fetchPages: null,
  }

  static propTypes = {
    comicId: PropTypes.string,
    comic: PropTypes.object,
    episodeId: PropTypes.string,
    episodes: PropTypes.object,
    pages: PropTypes.object,
    push: PropTypes.func,
    fetchComic: PropTypes.func,
    fetchPages: PropTypes.func,
  }

  componentDidMount() {
    this.handleDataFetch()
  }

  componentWillUpdate(nextProps) {
    this.handleDataFetch(nextProps)
  }

  onBackClick = () => {
    this.props.push('/')
  }

  onComicDrawerClick = () => {
  }

  onPrevEpisodeClick = () => this.handleEpisodeNavigation(-1)

  onNextEpisodeClick = () => this.handleEpisodeNavigation(+1)

  getNextEpisodeIdByOffset = (offset) => {
    const { episodeId, episodes } = this.props
    const episodeIds = Array.from(episodes.entries, val => val[0])
    return episodeIds[episodeIds.indexOf(episodeId) + offset]
  }

  handleEpisodeNavigation = (offset) => {
    const { comicId, push } = this.props
    const nextEpisodeId = this.getNextEpisodeIdByOffset(offset)
    if (nextEpisodeId) {
      push(`/viewer?cid=${comicId}&eid=${nextEpisodeId}`)
    }
  }

  handleDataFetch = (nextProps) => {
    const {
      comicId,
      episodeId,
      episodes,
      pages,
    } = nextProps || this.props

    const {
      comic,
      fetchComic,
      fetchPages,
    } = this.props

    if (!comicId || !episodeId) return

    if (!nextProps && !comic) {
      fetchComic(comicId)
    }

    if (comicId !== pages.comicId || episodeId !== pages.episodeId) {
      fetchPages(comicId, episodeId)
    }

    const episode = episodes.entries.get(episodeId)
    document.title = (comic && episode) ?
      `${comic.title} - ${episode.title} - ${App.title}` : App.title
  }

  render() {
    const { episodeId, episodes: { entries: episodes }, pages } = this.props

    return (
      <ComicViewer
        pages={ pages.entries }
        episode={ episodes.get(episodeId) }
        isFetching={ pages.isFetching }
        fetchError={ pages.fetchError }
        prevEpisode={ episodes.get(this.getNextEpisodeIdByOffset(-1)) }
        nextEpisode={ episodes.get(this.getNextEpisodeIdByOffset(+1)) }
        onPrevEpisodeClick={ this.onPrevEpisodeClick }
        onNextEpisodeClick={ this.onNextEpisodeClick }
        onBackClick={ this.onBackClick }
      />
    )
  }
}

function mapStateToProps(state, ownProps) {
  const query = new URLSearchParams(ownProps.location.search)
  const cid = query.get('cid')
  const eid = query.get('eid')

  return {
    comicId: cid,
    comic: {},
    comicViewer: state.comicViewer,
    episodeId: eid,
    episodes: state.episodes,
    pages: state.pages,
    push: ownProps.history.push,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchComic(comicId) {
      dispatch(Actions.fetchComic(comicId))
    },
    fetchPages(comicId, episodeId) {
      dispatch(Actions.fetchPages(comicId, episodeId))
    },
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(ComicViewerContainer))
