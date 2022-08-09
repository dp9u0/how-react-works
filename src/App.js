import * as React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Routes, Route } from "react-router-dom";
import Home from './routes/Home';
import About from './routes/About';
import ChildSample from './routes/ChildSample';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ChildSample />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sample" element={<ChildSample />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
