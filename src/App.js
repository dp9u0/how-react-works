import React, { Component } from 'react'
import Counter from './Counter';

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