import React from 'react';
import './App.scss';
import Header from './components/Header';
import CameraPage from './pages/camera/CameraPage';
//import Camera from './utils/device/Camera';


function addDataTest(data: string) {
  return process.env.NODE_ENV === 'test' ? data : undefined; 
}

const App: React.FC = () => {
  console.log(process.env.NODE_ENV);
  return (
    <div className="App" data-test='component-app' data-myo={addDataTest('home')}>
      <Header/>
     <CameraPage/>
    </div>
  );
}

export default App;
