# react-suspense-polyfill

> Provides a basic polyfill for the upcoming React Suspense APIs.

[![NPM](https://img.shields.io/npm/v/react-suspense-polyfill.svg)](https://www.npmjs.com/package/react-suspense-polyfill) [![Build Status](https://travis-ci.com/transitive-bullshit/react-suspense-polyfill.svg?branch=master)](https://travis-ci.com/transitive-bullshit/react-suspense-polyfill) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

- [x] `React.Placeholder`
- [x] `React.Timeout`
- [x] Supports React `v16`
- [x] Supports React `v15`
- [ ] Thorough compatibility tests
- [ ] Port over an existing suspense demo


## Status

This module is a **WIP** and is intended for experimenting with the upcoming React Suspense APIs. It is not yet ready to be incorporated into production builds.

Note that the actual version of Suspense that will ship with React is [significantly](https://github.com/facebook/react/pull/12279) [more](https://github.com/facebook/react/pull/13397) [complicated](https://github.com/facebook/react/pull/13398) and efficient than the version in this polyfill. It is meant solely for experimental purposes and to ease the burden of incrementally upgrading React.

I don't believe the current polyfill will play well with SSR.


## Install

```bash
npm install --save react-suspense-polyfill
```


## Usage

To enable the polyfill, just import the module near the entrypoint of your app (before rendering anything with React).

```js
import 'react-suspense-polyfill'
```

Suspense demos and [react-async-elements](https://github.com/palmerhq/react-async-elements) will now function as expected if you were to build the latest, suspense-enabled version of React yourself.

```js
import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import 'react-suspense-polyfill'

import { createCache, createResource } from 'simple-cache-provider'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
const cache = createCache()

// Loads the Thing component lazily
const getThing = createResource(
  () => sleep(2000).then(() => import('./Thing').then(mod => mod.default)),
  thing => thing
)

const LazyThing = props => {
  const Comp = getThing.read(cache, props)
  return <Comp {...props} />
}

class Example extends Component {
  render () {
    return (
      <React.Fragment>
        <h1>Suspense</h1>

        <React.Placeholder delayMs={500} fallback={<div>🌀 'Loading....'</div>}>
          <LazyThing />
        </React.Placeholder>
      </React.Fragment>
    )
  }
}

ReactDOM.render(<Example />, document.getElementById('root'))
```

In this example, the following rendering steps will occur:

1. React will invoke `Example`'s `render` method.
2. `React.Placeholder` will get rendered which will in turn attempt to render `LazyThing`.
3. The `LazyThing` will try to load its resource from the cache but fail and throw a `Promise`.
4. `React.Placeholder` (actually `React.Timeout` under the hood) will start waiting for that Promise to resolve and kick off a 500ms timeout.
5. Currently, the `React.Placeholder` is rendering nothing.
6. After 500ms, `React.Placeholder` will timeout and display its `fallback` loading content.
7. After another 1500ms (2000ms total), the `LazyThing` resource resolves.
8. `React.Placeholder` realizes it's child has resolved and again attempts to re-render its child.
9. The `LazyThing` component synchronously renders the previously cached `Thing` component.
10. All is right with the world 😃


## Related

- [react-suspense-starter](https://github.com/palmerhq/react-suspense-starter) - Alternative which bundles a pre-built version of Suspense-enabled React allowing you to experiment with React Suspense right meow.
- [react-async-elements](https://github.com/palmerhq/react-async-elements) - Suspense-friendly async React elements for common situations.
- [fresh-async-react](https://github.com/sw-yx/fresh-async-react) - More Suspense stuff (code, demos, and discussions).


## License

MIT © [transitive-bullshit](https://github.com/transitive-bullshit)
