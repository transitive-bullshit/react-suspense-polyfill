import { Component } from 'react'
import PropTypes from 'prop-types'

export default class Timeout extends Component {
  static propTypes = {
    ms: PropTypes.number,
    suspense: PropTypes.node,
    children: PropTypes.func.isRequired
  }

  static defaultProps = {
    ms: 0,
    suspense: null
  }

  state = {
    inSuspense: false,
    didExpire: false
  }

  _expireTimeout = null
  _suspender = null

  componentDidCatch(err, info) {
    if (typeof err.then === 'function') {
      const suspender = err
      this._suspender = suspender
      this._initTimeout()
      this.setState({ inSuspense: true })

      const update = () => {
        if (this._suspender !== suspender) return
        this.setState({ inSuspense: false })
        this._clearTimeout()

        if (this.state.didExpire) {
          this.setState({ didExpire: false })
        } else {
          this.forceUpdate()
        }
      }

      suspender.then(update, update)
    } else {
      // rethrow non-promise errors
      throw err
    }
  }

  render() {
    const {
      children,
      suspense
    } = this.props

    const {
      inSuspense,
      didExpire
    } = this.state

    if (inSuspense && !didExpire) {
      // optional: strictly for the purpose of demoing how suspense works
      return suspense
    } else {
      return children(didExpire)
    }
  }

  _initTimeout() {
    const {
      ms
    } = this.props

    this._clearTimeout()

    this._expireTimeout = setTimeout(() => {
      this.setState({ didExpire: true })
    }, ms)
  }

  _clearTimeout() {
    if (this._expireTimeout) {
      clearTimeout(this._expireTimeout)
      this._expireTimeout = null
    }
  }
}
