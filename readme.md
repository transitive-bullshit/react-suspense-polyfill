# react-suspense-polyfill

> Provides a basic polyfill for the upcoming React Suspense APIs.

[![NPM](https://img.shields.io/npm/v/react-suspense-polyfill.svg)](https://www.npmjs.com/package/react-suspense-polyfill) [![Build Status](https://travis-ci.com/transitive-bullshit/react-suspense-polyfill.svg?branch=master)](https://travis-ci.com/transitive-bullshit/react-suspense-polyfill) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

- [x] [React.Placeholder](src/placeholder.js)
- [x] [React.Timeout](src/timeout.js)
- [x] Support React `v16`
- [ ] Thorough compatibility tests
- [x] Basic suspense [demo](https://transitive-bullshit.github.io/react-suspense-polyfill/)
- [ ] Better suspense demo


## Status

This module is intended for understanding and experimenting with the upcoming React Suspense APIs.

Note that the actual version of Suspense that will ship with React is [significantly](https://github.com/facebook/react/pull/12279) [more](https://github.com/facebook/react/pull/13397) [complicated](https://github.com/facebook/react/pull/13398) and efficient than the version in this polyfill. It is meant solely for experimental purposes and to ease the burden of incremental upgrades.

The current polyfill will likely not play well with SSR.

## How It Works

At its core, React Suspense works by allowing an async component to throw a Promise from its `render` method.

This polyfill mimics React's internal support for this behavior by implementing an [error boundary](https://github.com/transitive-bullshit/react-suspense-polyfill/blob/master/src/timeout.js#L24) in the [Timeout](src/timeout.js) component. If the error boundary encounters a thrown Promise, it waits until that Promise resolves and then attempts to re-render its children. It also handles falling back to loading content if the Promise takes too long to resolve.

The reason this polyfill does not support React `v15` is because error boundaries weren't supported properly until React `v16`. If you have ideas on how to support this functionality in React `v15`, please submit an [issue](https://github.com/transitive-bullshit/react-suspense-polyfill/issues) and let's discuss!

Note that React will log an error to the console regarding the thrown error, but *this can safely be ignored*. Unfortunately, there is no way to [disable](https://github.com/facebook/react/issues/11098) this error reporting for these types of intentional use cases.

With that being said, I hope this module and accompanying demos make it easier to get up-to-speed with React Suspense. 😄


## Install

```bash
npm install --save react-suspense-polyfill
```


## Usage

The only difference between using this polyfill and a suspense-enabled version of React, is that you must import `{ Placeholder }` from `react-suspense-polyfill` instead of from `React`.

With this minor change, suspense demos and [react-async-elements](https://github.com/palmerhq/react-async-elements) will function as expected.

```js
import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import { Placeholder } from 'react-suspense-polyfill'

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

        <Placeholder delayMs={500} fallback={<div>🌀 'Loading....'</div>}>
          <LazyThing />
        </Placeholder>
      </React.Fragment>
    )
  }
}

ReactDOM.render(<Example />, document.getElementById('root'))
```

In this example, the following rendering steps will occur:

1. React will invoke `Example`'s `render` method.
2. `Placeholder` will get rendered which will in turn attempt to render `LazyThing`.
3. The `LazyThing` will try to load its resource from the cache but fail and throw a `Promise`.
4. `Placeholder` (actually `Timeout` under the hood) will catch this `Promise` in its error boundary `componentDidCatch`.
5. `Placeholder` starts waiting for that Promise to resolve and kicks off a 500ms timeout. Currently, the `Placeholder` subtree is rendering nothing.
6. After 500ms, `Placeholder` will timeout and display its `fallback` loading content.
7. After another 1500ms (2000ms total), the `LazyThing` resource resolves.
8. `Placeholder` realizes it's child has resolved and again attempts to re-render its child.
9. The `LazyThing` component synchronously renders the previously cached `Thing` component.
10. All is right with the world 😃


## Related

- [react-suspense-starter](https://github.com/palmerhq/react-suspense-starter) - Alternative which bundles a pre-built version of Suspense-enabled React allowing you to experiment with React Suspense right meow.
- [react-async-elements](https://github.com/palmerhq/react-async-elements) - Suspense-friendly async React elements for common situations.
- [fresh-async-react](https://github.com/sw-yx/fresh-async-react) - More Suspense stuff (code, demos, and discussions).


## License

MIT © [transitive-bullshit](https://github.com/transitive-bullshit)
