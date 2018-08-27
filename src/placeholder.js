import React from 'react'
import PropTypes from 'prop-types'
import Timeout from './timeout'

export default function Placeholder (props) {
  const {
    delayMs,
    fallback,
    suspense,
    children
  } = props

  return (
    <Timeout ms={delayMs} suspense={suspense}>
      {didExpire => (didExpire ? fallback : children)}
    </Timeout>
  )
}

Placeholder.propTypes = {
  delayMs: PropTypes.number,
  fallback: PropTypes.node,
  suspense: PropTypes.node,
  children: PropTypes.node
}

Placeholder.defaultProps = {
  fallback: null,
  suspense: null,
  children: null
}
