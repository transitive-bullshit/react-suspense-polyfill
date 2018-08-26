import React from 'react'

import Placeholder from './placeholder'
import Timeout from './timeout'

if (React.Timeout === undefined) {
  React.Timeout = Timeout
}

if (React.Placeholder === undefined) {
  React.Placeholder = Placeholder
}
