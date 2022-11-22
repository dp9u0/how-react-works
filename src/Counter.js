import React, { Component } from 'react'

export class Counter extends Component {
  state = { counter: 1 };

  render() {
    const { counter } = this.state;
    return (
      <div>
        <button style={{ margin: 50 }} onClick={() => {
          this.setState({ counter: counter + 1 })
        }}>Count</button>
        {counter}
      </div>
    )
  }
}

export default Counter