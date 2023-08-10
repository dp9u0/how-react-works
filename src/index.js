import React from 'react';
import ReactDOM from 'react-dom';
import App from './sample1';
const rootNode1 = document.getElementById('root1')
ReactDOM.render(<App />, rootNode1);
// ReactDOM.unstable_createRoot(rootNode1).render(<App />);

console.log(React.version)