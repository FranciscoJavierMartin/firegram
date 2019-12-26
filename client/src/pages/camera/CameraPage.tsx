import React,{useState} from 'react';
import Camera from '../../components/camera/Camera';

const CameraPage = () => {
  const [ imageUrl, setImageUrl] = useState<string>('No image');

  const setCustomImageUrl = (imageUrl: string) => {

  };

  return (
    <div>
      <Camera setImageUrl={setImageUrl} />
      
      <img src={imageUrl} alt='No image'/>
    </div>
  );
};

export default CameraPage;
