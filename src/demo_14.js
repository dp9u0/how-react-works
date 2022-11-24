import React, { Component } from 'react'

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

export class Counter2 extends Component {
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

export class App extends Component {
  state = { inc: 0 }
  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({ inc: ~~(performance.now()) })
    }, 60000);
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  render() {
    return (
      <>
        <div><Counter inc={this.state.inc} /></div>
      </>
    )
  }
}

export default App