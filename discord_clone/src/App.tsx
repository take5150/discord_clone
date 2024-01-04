import React from 'react';
import './App.scss';
import Sidebar from "./components/sidebar/Sidebar"  
import Home from './components/home/Home';

function App() {
  return (
    <div className="App">
      {/* sidebar */}
      <Sidebar />
      {/* home */}
      <Home />
    </div>
  );
}

export default App;
