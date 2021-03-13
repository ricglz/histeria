import { db } from '../constants/firebase'
import { markRead } from './userPrefs'

const HOST = process.env.SERVER_URL

function genericFetch(url, type) {
  return (dispatch, getState) => {
    if (!getState().comics.isFetching) {
      return dispatch({
        type,
        payload: {
          promise: new Promise((resolve, reject) => {
            fetch(`${HOST}/${url}`)
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

function getDocFullData(doc) {
  if (doc.exists) {
    return { id: doc.id, ...doc.data() }
  }
  return {}
}

export function fetchComics() {
  return (dispatch, getState) => {
    if (!getState().comics.isFetching) {
      return dispatch({
        type: 'FETCH_COMICS',
        payload: {
          promise: new Promise((resolve, reject) => {
            db.orderBy('order').get().then((snapshot) => {
              const data = []
              snapshot.forEach((doc) => {
                const fullData = getDocFullData(doc)
                data.push(fullData)
              })
              return data
            })
              .then(resolve)
              .catch(reject)
          }),
        },
      })
    }
    return false
  }
}

export function fetchComic(comicId) {
  return (dispatch, getState) => {
    if (!getState().comics.isFetching) {
      return dispatch({
        type: 'FETCH_COMIC',
        payload: {
          promise: new Promise((resolve, reject) => {
            const ref = db.doc(comicId)
            ref.get().then(getDocFullData).then(resolve).catch(reject)
          }),
        },
      })
    }
    return false
  }
}

export function fetchEpisodes(comicId) {
  return genericFetch(`api/v1/comics/${comicId}/episodes/data`, 'FETCH_EPISODES')
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
            const ref = db.doc(comicId)
            ref.get().then(doc => (doc.exists ? doc.data().pages : []))
              .then((data) => {
                dispatch(markRead(comicId, episodeId))
                resolve(data)
              })
              .catch(reject)
          }),
        },
      })
    }
    return false
  }
}
