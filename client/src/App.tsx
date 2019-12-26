import React from 'react';
import './App.scss';
import Header from './components/Header';
import CameraPage from './pages/camera/CameraPage';

const App: React.FC = () => {
  console.log(process.env.NODE_ENV);
  return (
    <div className="App" data-test='component-app'>
      <Header/>
     <CameraPage/>
    </div>
  );
}

export default App;
