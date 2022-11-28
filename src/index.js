import React from 'react';
import ReactDOM from 'react-dom';
import App from './demo_0';
const rootNode = document.getElementById('root1')
// ReactDOM.render(<App />, rootNode);
ReactDOM.unstable_createRoot(rootNode).render(<App />);

console.log(React.version)