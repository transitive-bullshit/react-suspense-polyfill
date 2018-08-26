# react-suspense-polyfill

> Polyfill for React Suspense API.

[![NPM](https://img.shields.io/npm/v/react-suspense-polyfill.svg)](https://www.npmjs.com/package/react-suspense-polyfill) [![Build Status](https://travis-ci.com/transitive-bullshit/react-suspense-polyfill.svg?branch=master)](https://travis-ci.com/transitive-bullshit/react-suspense-polyfill) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

Provides a basic polyfill for the upcoming React Suspense APIs.

- [x] `React.Placeholder`
- [x] `React.Timeout`
- [x] Supports React `v16`
- [x] Supports React `v15`
- [ ] Thorough compatibility tests

## Status

This module is a **WIP** and is intended for experimenting with the upcoming React Suspense APIs. It is not yet ready to be incorporated into production builds.

## Install

```bash
npm install --save react-suspense-polyfill
```

## Usage

All you need to do to enable this polyfill is import the module towards the entrypoint of your app (before rendering anything with React).

```js
import 'react-suspense-polyfill'
```

Suspense demos and [react-async-elements](https://github.com/palmerhq/react-async-elements) will now function as expected if you were to build the latest, suspense-enabled version of React yourself.

```js
import React, { Component } from 'react'
import 'react-suspense-polyfill'

import { createCache, createResource } from 'simple-cache-provider'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
const cache = createCache()

// Loads the Thing component lazily
const getThing = createResource(
  () => sleep(1000).then(() => import('./Thing').then(mod => mod.default)),
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
```

Note the usage of `React.Placeholder` in this example.

## Related

- [react-suspense-starter](https://github.com/palmerhq/react-suspense-starter) - Alternative which bundles a pre-built version of Suspense-enabled React allowing you to experiment with React Suspense right meow.
- [react-async-elements](https://github.com/palmerhq/react-async-elements) - Suspense-friendly async React elements for common situations.
- [fresh-async-react](https://github.com/sw-yx/fresh-async-react) - More Suspense stuff (code, demos, and discussions).

## License

MIT © [transitive-bullshit](https://github.com/transitive-bullshit)
