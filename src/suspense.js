import React from 'react'
import PropTypes from 'prop-types'
import Timeout from './timeout'

export default function Suspense (props) {
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

Suspense.propTypes = {
  delayMs: PropTypes.number,
  fallback: PropTypes.node,
  suspense: PropTypes.node,
  children: PropTypes.node
}

Suspense.defaultProps = {
  fallback: null,
  suspense: null,
  children: null
}
