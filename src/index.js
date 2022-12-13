import React from 'react';
import ReactDOM from 'react-dom';
import App from './demo_8';
const rootNode1 = document.getElementById('root1')
ReactDOM.render(<App />, rootNode1);
// ReactDOM.unstable_createRoot(rootNode1).render(<App />);

// setTimeout(() => {
//   const rootNode2 = document.getElementById('root2')
//   ReactDOM.render(<App />, rootNode2);
//   // ReactDOM.unstable_createRoot(rootNode2).render(<App />);
// }, 1000)

console.log(React.version)