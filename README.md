# Comiz

A playground

## Prerequisites

* [node] >= 5.9.x
* [npm] >= 3.7.x

## Techniques

* [react] - A declarative, efficient, and flexible JavaScript library for building user interfaces.
* [redux] - a predictable state container for JavaScript apps.
* [webpack] - module bundler.
* [babel] - A compiler for writing next generation JavaScript.
* [css-modules] - Modulize CSS.

## Contribute

1. Install npm packages
  ```
  npm install
  ```

2. Start webpack dev server
  ```
  npm start
  ```

3. Open up <http://localhost:3990> in browser

## Application State Structure

Note: This state structure hasn't been implemented yet see.  See issue #4

```js
{
  // Save in localStorage
  userPref: {
    favorites: [1, 3, 7],
    reads: [{ cid: 1, eid: 2 }, { cid: 2, eid: 3 }]
  },

  comics: {
    isFetching: false,
    fetchError: false,
    entries: {
      1: {
        id: 1,
        title: 'title1'
      },
      2: {
        id: 2,
        title: 'title2'
      }
    }
  },

  episodes: {
    comicId: 1,
    isFetching: false,
    fetchError: false,
    entries: {
      1: {
        id: 1,
        title: 'title1'
      },
      2: {
        id: 2,
        title: 'title2'
      }
    }
  },

  pages: {
    comicId: 1,
    episodeId: 2,
    isFetching: false,
    fetchError: false,
    entries: {
      1: 'http://path/to/page1',
      2: 'http://path/to/page2'
    }
  },

  comicDrawer: {
    open: false,
    comicId: 1
  },

  comicViewer: {
    open: false,
    comicId: 1,
    episodeId: 1
  },

  filter: {
    category: 'SHOW_LATEST',
    query: 'user query string'
  }
}
```

[node]: https://nodejs.org/
[npm]: https://www.npmjs.com/
[react]: https://github.com/facebook/react
[redux]: http://redux.js.org/
[webpack]: https://github.com/webpack/webpack
[babel]: https://github.com/babel/babel
[css-modules]: https://github.com/css-modules/css-modules
