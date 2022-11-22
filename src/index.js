import React from 'react';
import ReactDOM from 'react-dom';
import App from './Counter';

ReactDOM.render(<App />, document.getElementById('root1'));

ReactDOM.render(<App />, document.getElementById('root2'));

console.log(React.version)