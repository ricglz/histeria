import { db, increment } from '../constants/firebase'

const initialState = {
  favorites: [],
  reads: [],
}

function toggleFavorite(favorites, comicId) {
  const idx = favorites.indexOf(comicId)
  const newFavorites = [...favorites]
  if (idx === -1) {
    newFavorites.push(comicId)
  } else {
    newFavorites.splice(idx, 1)
  }
  localStorage.setItem('userPrefs.favorites', JSON.stringify(newFavorites.sort()))
  return newFavorites
}

function markRead(reads, comicId, episodeId) {
  const found = reads.find(read => (
    read.comicId === comicId && read.episodeId === episodeId
  ))

  if (found != null) {
    return reads
  }
  db.doc(comicId).update({ views: increment(1) })
  const newReads = [...reads]
  newReads.push({ comicId, episodeId })
  localStorage.setItem('userPrefs.reads', JSON.stringify(newReads))
  return newReads
}

function unmarkRead(reads, comicId, episodeId) {
  const index = reads.findIndex(read => (
    read.comicId === comicId && read.episodeId === episodeId
  ))

  if (index !== -1) {
    const newReads = [...reads]
    newReads.splice(index, 1)
    localStorage.setItem('userPrefs.reads', JSON.stringify(newReads))
    return newReads
  }
  return reads
}

function toggleRead(reads, comicId, episodeId) {
  const found = reads.find(read => (
    read.comicId === comicId && read.episodeId === episodeId
  ))

  return found ?
    unmarkRead(reads, comicId, episodeId) : markRead(reads, comicId, episodeId)
}

export default function (state = initialState, action) {
  switch (action.type) {
    case 'TOGGLE_FAVORITE':
      return {
        ...state,
        favorites: toggleFavorite(state.favorites, action.payload.comicId),
      }
    case 'MARK_READ':
      return {
        ...state,
        reads: markRead(state.reads, action.payload.comicId, action.payload.episodeId),
      }
    case 'UNMARK_READ':
      return {
        ...state,
        reads: unmarkRead(state.reads, action.payload.comicId, action.payload.episodeId),
      }
    case 'TOGGLE_READ':
      return {
        ...state,
        reads: toggleRead(state.reads, action.payload.comicId, action.payload.episodeId),
      }
    default:
      return state
  }
}
