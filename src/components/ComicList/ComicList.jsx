import React, { PropTypes } from 'react'

import ComicItem from '../ComicItem'

import styles from './ComicList.css'

export default class ComicList extends React.Component {

  static propTypes = {
    url: PropTypes.string.isRequired,
    onComicTap: PropTypes.func
  }

  state = {
    comics: []
  }

  componentDidMount() {
    fetch(this.props.url)
      .then(res => res.ok ? res.json() : [])
      .then(comics => this.setState({ comics }))
      .catch(err => console.error(err))
  }

  onComicTap = (comic) => {
    this.props.onComicTap && this.props.onComicTap(comic)
  }

  render() {
    return (
      <div className={ styles.comicList }>
        <div className={ styles.comicListInner }>
        {
          this.state.comics.map((comic) => (
            <ComicItem
              key= { comic.id }
              comic={ comic }
              onComicTap={ this.onComicTap }
            />
          ))
        }
        </div>
      </div>
    )
  }

}