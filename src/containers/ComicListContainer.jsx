import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import ComicList from '../components/ComicList'

import * as Actions from '../actions'

class ComicListContainer extends React.Component {

  static propTypes = {
    filter: PropTypes.object.isRequired,
    comics: PropTypes.array.isRequired,
    shrink: PropTypes.bool.isRequired
  }

  componentDidMount() {
    if (!this.props.comics || this.props.comics.length === 0) {
      this.props.dispatch(Actions.fetchComicsIfNeeded())
    }
  }

  filterComics = () => {
    let { filter, comics } = this.props

    switch (filter.category) {
      case 'SHOW_FAVORITE':
        comics = comics.filter(comic => comic.favorite)
        break
    }

    let reg
    try {
      reg = new RegExp(filter.query || '.+', 'i')
    } catch (err) {
      return []
    }

    return comics.filter(comic =>
      reg.test(comic.title)
    )
  }

  render() {
    return (
      <ComicList comics={ this.filterComics() } shrink={this.props.shrink} />
    )
  }

}

const mapStateToProps = (state) => {
  return {
    filter: state.filter,
    comics: state.comic.comics
  }
}

export default connect(
  mapStateToProps
)(ComicListContainer)