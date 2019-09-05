import React from 'react';
import Nav from './components/Nav';
import Home from './components/Home';
import Content from './components/Content';
import Footer from './components/Footer';

function App() {
  return (
    <div className='App'>
      <Nav />
      <Home />
      <Content />
      <Footer />
    </div>
  );
}

export default App;
