import React, { Component, Placeholder } from 'react'
import 'react-suspense-polyfill'

import { Img } from 'react-async-elements'

console.log(Placeholder)

export default class App extends Component {
  render () {
    return (
      <div>
        <h1>Suspense Demo</h1>

        <React.Placeholder delayMs={300} fallback={'Loading...'}>
          <Img src='https://source.unsplash.com/random/4000x2000' />
        </React.Placeholder>
      </div>
    )
  }
}
