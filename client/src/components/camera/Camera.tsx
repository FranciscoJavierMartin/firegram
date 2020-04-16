import React, { useRef, useEffect } from 'react';
import { useUserMedia } from '../../hooks/useUserMedia';
import './Camera.module.scss';
import { uploadPost } from '../../firebase/firebase.utils';
import { PHOTO_WIDTH, PHOTO_HEIGHT } from '../../constants/constants';

interface ICameraProps {
  closeModal: () => void;
}

const Camera = (props: ICameraProps) => {
  let titleInputRef = useRef<HTMLInputElement>(null);
  let videoRef = useRef<HTMLVideoElement>(null);
  let canvasRef = useRef<HTMLCanvasElement>(null);

  const mediaStream = useUserMedia({
    audio: false,
    video: { width: PHOTO_WIDTH, height: PHOTO_HEIGHT }
  });

  if (mediaStream && videoRef.current && !videoRef.current.srcObject) {
    videoRef.current.srcObject = mediaStream;
  }

  // Stop the video stream when component is unmount
  useEffect(() => {
    return () => {
      if (mediaStream) {
        mediaStream.getTracks()[0].stop();
      }
    };
  }, [mediaStream]);

  const onCapture: BlobCallback = async (blob: any) => {

    let title: string = titleInputRef.current ? titleInputRef.current.value : '';

    try{
      uploadPost(blob, title);
    } catch(err){
      console.error(err);
    } finally {
      if(props.closeModal){
        props.closeModal();
      }
    }

    if (mediaStream) {
      mediaStream.getTracks()[0].stop();
    }
  };

  return (
    <div>
      <div>
        <video ref={videoRef} autoPlay muted data-test='video'/>
        <canvas ref={canvasRef} width={300} height={300} data-test='canvas'/>
      </div>
      <div>
        <input 
          type='text' 
          name='title' 
          ref={titleInputRef}
          placeholder='Title'
          data-test='input-title'/>
      </div>
      <button
        type='button'
        data-test='button-take-photo'
        onClick={() => {
          if (canvasRef.current) {
            const context: CanvasRenderingContext2D = canvasRef.current.getContext('2d')!!;
            // This is for rotate the photo
            context.translate(PHOTO_WIDTH, 0);
            context.scale(-1, 1);

            if(videoRef.current){
              context.drawImage(videoRef.current, 0, 0, PHOTO_WIDTH, PHOTO_HEIGHT);
              canvasRef.current.toBlob(
                (blob: any) => onCapture(blob),
                'image/jpeg',
                1
              );
            }
            
            context.clearRect(0, 0, PHOTO_WIDTH, PHOTO_HEIGHT);
          }
        }}
      >
        Take photo
      </button>
    </div>
  );
};

export default Camera;
