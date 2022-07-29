import React from './react';

const FC = () => {
  return <div>this is a Function Components</div>
}

function Counter1() {
  const [count, setCount] = React.useState(1);
  const [count2, setCount2] = React.useState(1);

  const onClickHandler = () => {
    setCount(count + 1);
  }

  const onClickHandler2 = () => {
    setCount2(count2 + 1);
  }

  return (
    <div>
      <h3>Count1: {count}</h3>
      <button onClick={onClickHandler}>Count1+1</button>
      <h3>Count2: {count2}</h3>
      <button onClick={onClickHandler2}>Count2+1</button>
    </div>
  );
}

function Counter2() {
  const [count, setCount] = React.useState(1);

  const onClickHandler = () => {
    setCount(count + 1);
  }

  return (
    <div>
      <h3>Count: {count}</h3>
      <button onClick={onClickHandler}>Count+1</button>
    </div>
  );
}

class __Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 1
    }
  }

  onClickHandler = () => {
    this.setState({
      count: this.state.count + 1
    })
  }

  render() {
    return (
      <div>
        <h3>Count: {this.state.count}</h3>
        <button onClick={this.onClickHandler}>Count+1</button>
      </div>
    );
  }
}

const Counter3 = React.transfer(__Counter)

const App = (props) =>
(<div>
  <h1 id="title">{props.title}</h1>
  <a href="xxx">Jump</a>
  <section>
    <p>
      Article
    </p>
  </section>
  <section>
    <FC />
  </section>
  <section>
    <Counter1 />
  </section>
  <section>
    <Counter2 />
  </section>
  <section>
    <Counter3 />
  </section>
</div>);

export default App;