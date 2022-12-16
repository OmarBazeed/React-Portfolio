import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.scss';
import About from './components/About';
import Home from './components/Home';
import Layout from './components/Layout';
import Skills from './components/Skills';


function App() {
  return (
    <React.Fragment>
    

      <Routes>

        <Route path='/' element={<Layout />} >
          <Route path='home' element={<Home />} />
          <Route path='about' element={<About />} />
          <Route path='skills' element={<Skills />} />
        </Route>
        
      </Routes>

    </React.Fragment>
  );
}

export default App;
