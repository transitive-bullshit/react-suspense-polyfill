import React, { Component } from 'react'
import { Suspense } from 'react-suspense-polyfill'

import { Img } from 'react-async-elements'

export default class App extends Component {
  render () {
    return (
      <div>
        <h1>Suspense Demo</h1>

        <p>Refresh the page to load a new image.</p>

        <Suspense
          delayMs={300}
          fallback={'Loading...'}
          suspense={(
            <span>😮 SUSPENSE 😮</span>
          )}
        >
          <Img
            src='https://source.unsplash.com/random/4000x2000'
            style={{
              width: '50%'
            }}
          />
        </Suspense>
      </div>
    )
  }
}
