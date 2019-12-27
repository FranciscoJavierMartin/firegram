import React, { useState } from 'react';
import Camera from '../../components/camera/Camera';

const CameraPage = () => {
  const [imageUrl, setImageUrl] = useState<string>('No image');

  return (
    <div>
      <Camera setImageUrl={setImageUrl} />
      <img src={imageUrl} alt='There are something'/>
    </div>
  );
};

export default CameraPage;
