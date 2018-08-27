import React from 'react'

import Placeholder from './placeholder'
import Timeout from './timeout'

if (React.Timeout === undefined) {
  React.__proto__.Timeout = Timeout
  console.log(React.Timeout)
}

if (React.Placeholder === undefined) {
  React.__proto__.Placeholder = Placeholder
  console.log(React.Placeholder)
}

export default { Placeholder, Timeout }
