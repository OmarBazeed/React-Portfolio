import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.scss';
import About from './components/About';
import Home from './components/Home';
import Layout from './components/Layout';
import Contact from './components/Contact';
import Skills from './components/Skills';
import Portfolio from './components/Portfolio';


function App() {
  return (
    <React.Fragment>
    

      <Routes>

        <Route path='/' element={<Layout />} >
          <Route index element={<Home />} />
          <Route path='about' element={<About />} />
          <Route path='skills' element={<Skills />} />
          <Route path='portfolio' element={<Portfolio />} />
          <Route path='contact' element={<Contact />} />
        </Route>

      </Routes>

    </React.Fragment>
  );
}

export default App;
