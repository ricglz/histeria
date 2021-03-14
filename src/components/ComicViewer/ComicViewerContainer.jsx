import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import ComicViewer from './ComicViewer'

import Actions from '../../actions'
import { App } from '../../constants'

class ComicViewerContainer extends React.Component {
  static propTypes = {
    comicId: PropTypes.string,
    comic: PropTypes.object,
    comics: PropTypes.object,
    episodeId: PropTypes.string,
    episodes: PropTypes.object,
    pages: PropTypes.object,
    push: PropTypes.func,
    fetchComics: PropTypes.func,
    fetchPages: PropTypes.func,
  }

  static defaultProps = {
    comicId: 0,
    comic: {},
    comics: [],
    episodeId: 0,
    episodes: {},
    pages: {},
    push: null,
    fetchComics: null,
    fetchPages: null,
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

  getNextByOffset = (offset) => {
    const { comicId, comics } = this.props
    const ids = Array.from(comics.entries, val => val[0])
    return ids[ids.indexOf(comicId) + offset]
  }

  handleEpisodeNavigation = (offset) => {
    const nextId = this.getNextByOffset(offset)
    if (nextId) {
      this.props.push(`/viewer?cid=${nextId}&eid=1`)
    }
  }

  handleDataFetch = (nextProps) => {
    const {
      comicId,
      episodeId,
      pages,
    } = nextProps || this.props

    const {
      comic,
      fetchComics,
      fetchPages,
    } = this.props

    if (!comicId || !episodeId) return

    if (nextProps == null && (comic == null || comic.title == null)) {
      fetchComics()
    }

    if (comicId !== pages.comicId || episodeId !== pages.episodeId) {
      fetchPages(comicId, episodeId)
    }

    document.title = (comic != null) ? comic.title || '' : App.title
  }

  render() {
    const {
      episodeId, comics: { entries: comics }, episodes: { entries: episodes }, pages,
    } = this.props
    const prevEpisode = comics.get(this.getNextByOffset(-1))
    const nextEpisode = comics.get(this.getNextByOffset(+1))

    return (
      <ComicViewer
        pages={ pages.entries }
        episode={ episodes.get(episodeId) }
        isFetching={ pages.isFetching }
        fetchError={ pages.fetchError }
        prevEpisode={ prevEpisode }
        nextEpisode={ nextEpisode }
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
  const {
    comics, comicViewer, episodes, pages,
  } = state

  return {
    comicId: cid,
    comic: comics.entries.get(cid),
    comics,
    comicViewer,
    episodeId: eid,
    episodes,
    pages,
    push: ownProps.history.push,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchComics() {
      dispatch(Actions.fetchComics())
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
