import { markRead } from './userPrefs'

const HOST = process.env.SERVER_URL

export function fetchComics() {
  return (dispatch, getState) => {
    if (!getState().comics.isFetching) {
      return dispatch({
        type: 'FETCH_COMICS',
        payload: {
          promise: new Promise((resolve, reject) => {
            fetch(`${HOST}/api/v1/updates`)
              .then(response => response.json())
              .then(resolve)
              .catch(reject)
          }),
        },
      }).catch(() => {})
    }
    return false
  }
}

export function fetchComic(comicId) {
  return (dispatch, getState) => {
    if (!getState().comics.isFetching) {
      return dispatch({
        type: 'FETCH_COMIC',
        payload: new Promise((resolve, reject) => {
          fetch(`${HOST}/api/v1/comics/${comicId}/data`)
            .then(response => response.json())
            .then(resolve)
            .catch(reject)
        }),
      }).catch(() => {})
    }
    return false
  }
}

export function fetchEpisodes(comicId) {
  return (dispatch, getState) => {
    if (!getState().episodes.isFetching) {
      return dispatch({
        type: 'FETCH_EPISODES',
        payload: {
          data: {
            comicId,
          },
          promise: new Promise((resolve, reject) => {
            fetch(`${HOST}/api/v1/comics/${comicId}/episodes/data`)
              .then(response => response.json())
              .then(resolve)
              .catch(reject)
          }),
        },
      }).catch(() => {})
    }
    return false
  }
}

export function fetchPages(comicId, episodeId) {
  return (dispatch, getState) => {
    if (!getState().pages.isFetching) {
      return dispatch({
        type: 'FETCH_PAGES',
        payload: {
          data: {
            comicId,
            episodeId,
          },
          promise: new Promise((resolve, reject) => {
            fetch(`${HOST}/api/v1/comics/${comicId}/episodes/${episodeId}/pages/data`)
              .then(response => response.json())
              .then((data) => {
                dispatch(markRead(comicId, episodeId))
                resolve(data)
              })
              .catch(reject)
          }),
        },
      }).catch(() => {})
    }
    return false
  }
}
