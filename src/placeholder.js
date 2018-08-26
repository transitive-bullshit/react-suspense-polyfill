import React from 'react'
import PropTypes from 'prop-types'
import Timeout from './timeout'

export default function Placeholder (props) {
  const {
    delayMs,
    fallback,
    children
  } = props

  return (
    <Timeout ms={delayMs}>
      {didExpire => (didExpire ? fallback : children)}
    </Timeout>
  )
}

Placeholder.propTypes = {
  delayMs: PropTypes.number,
  fallback: PropTypes.node,
  children: PropTypes.node
}
