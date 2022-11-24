import React, { Component } from 'react'
import Counter2 from './Counter2';

export class Counter extends Component {
  state = { counter: 1 };

  render() {
    const { counter } = this.state;
    return (
      <span>
        <button style={{ margin: 50 }} onClick={() => {
          this.setState({ counter: counter + 1 })
        }}>Count1</button>
        {this.props.inc + counter}
        <br />
        <Counter2 inc={this.props.inc + counter}></Counter2>
      </span>
    )
  }
}

export default Counter