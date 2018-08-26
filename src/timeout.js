import { Component } from 'react'
import PropTypes from 'prop-types'

// TODO:
// - move children invocation outside render to make it pure..?
// - possibly create new React Root?

export default class Timeout extends Component {
  static propTypes = {
    ms: PropTypes.string.isRequired,
    children: PropTypes.func.isRequired
  }

  static defaultProps = {
    ms: 0
  }

  state = {
    didExpire: false
  }

  _expireTimeout = null
  _suspender = null

  render() {
    const {
      children
    } = this.props

    const {
      didExpire
    } = this.state

    try {
      return children(didExpire)
    } catch (err) {
      if (typeof err.then === 'function') {
        const suspender = err
        this._suspender = suspender
        this._initTimeout()

        const update = () => {
          if (this._suspender !== suspender) return
          this._clearTimeout()

          if (this.state.didExpire) {
            this.setState({ didExpire: false })
          } else {
            this.forceUpdate()
          }
        }

        suspender.then(update, update)
      } else {
        // bubble up error to nearest error boundary
        throw err
      }
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
