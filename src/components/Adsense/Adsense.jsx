import React from 'react'

export default class Adsense extends React.Component {
  componentDidMount() {
    (window.adsbygoogle = window.adsbygoogle || []).push({})
  }

  render() {
    return (
      <ins
        className="adsbygoogle"
        style={ { display: 'block' } }
        data-ad-client="ca-pub-2513653840968078"
        data-ad-slot="2513653840968078"
        data-ad-format="auto"
      />
    )
  }
}
