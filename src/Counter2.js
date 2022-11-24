import React, { Component } from 'react'

export class Counter extends Component {
  state = { counter: 1 };

  render() {
    const { counter } = this.state;
    return (
      <span>
        <button style={{ margin: 50 }} onClick={() => {
          this.setState({ counter: counter + 1 })
        }}>Count2</button>
        {this.props.inc + counter}
      </span>
    )
  }
}

export default Counter