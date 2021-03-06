// import { markRead } from './userPrefs'

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
  return genericFetch('api/v1/updates', 'FETCH_COMICS')
}

export function fetchComic(comicId) {
  return genericFetch(`api/v1/comics/${comicId}/data`, 'FETCH_COMIC')
}

export function fetchEpisodes(comicId) {
  return genericFetch(`api/v1/comics/${comicId}/episodes/data`, 'FETCH_EPISODES')
}

export function fetchPages(comicId, episodeId) {
  const url = `api/v1/comics/${comicId}/episodes/${episodeId}/pages/data`
  return genericFetch(url, 'FETCH_PAGES')
}
