import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App';
const App = () => (
  <div id='a' key='a'>
    <div id='a-1' key='a-1'>TEST</div>
    <span id='a-2' key='a-2'></span>
  </div>
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);