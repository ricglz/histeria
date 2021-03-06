import { db } from '../constants/firebase'

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

export function fetchComics() {
  return (dispatch, getState) => {
    if (!getState().comics.isFetching) {
      return dispatch({
        type: 'FETCH_COMICS',
        payload: {
          promise: new Promise((resolve, reject) => {
            db.collection('comics').get().then((snapshot) => {
              const data = []
              snapshot.forEach((doc) => {
                const fullData = { id: doc.id, ...doc.data() }
                data.push(fullData)
              })
              return data
            }).then(resolve)
              .catch(reject)
          }),
        },
      })
    }
    return false
  }
}

export function fetchComic(comicId) {
  return genericFetch(`api/v1/comics/${comicId}/data`, 'FETCH_COMIC')
}

export function fetchEpisodes(comicId) {
  return genericFetch(`api/v1/comics/${comicId}/episodes/data`, 'FETCH_EPISODES')
}

export function fetchPages(comicId, episodeId) {
  return (dispatch, getState) => {
    if (!getState().comics.isFetching) {
      return dispatch({
        type: 'FETCH_PAGES',
        payload: {
          data: {
            comicId,
            episodeId,
          },
          promise: new Promise((resolve, reject) => {
            const ref = db.collection('comics').doc(comicId)
            ref.get().then(doc => (doc.exists ? doc.data().pages : []))
              .then((data) => {
                console.log(data)
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
