import React from 'react'

import Suspense from './suspense'
import Timeout from './timeout'

/*
if (React.Timeout === undefined) {
  React.__proto__.Timeout = Timeout
  console.log(React.Timeout)
}

if (React.Suspense === undefined) {
  React.__proto__.Suspense = Suspense
  console.log(React.Suspense)
}
*/

export { Suspense, Timeout }
