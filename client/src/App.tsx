import React from 'react';
import './App.scss';
import Header from './components/Header';
import CameraPage from './pages/camera/CameraPage';
//import Camera from './utils/device/Camera';

const App: React.FC = () => {

  return (
    <div className="App">
      <Header/>
     <CameraPage/>
    </div>
  );
}

export default App;
