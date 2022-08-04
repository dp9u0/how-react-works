import * as React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Routes, Route } from "react-router-dom";
import Home from './routes/Home';
import About from './routes/About';
import Test from './routes/Test';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
