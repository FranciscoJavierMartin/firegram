import React from 'react';
import './App.scss';
import Header from './components/Header';
//import Camera from './utils/device/Camera';

const App: React.FC = () => {
  //const videoRef = useRef();
  //const [camera, setCamera] = useState();
  //<video ref={ref => setCamera(new Camera(ref))} autoPlay/>
  return (
    <div className="App">
      <Header/>
     
    </div>
  );
}

export default App;
