import React, { useRef, useEffect } from 'react';
import { useUserMedia } from '../../hooks/useUserMedia';
import './Camera.module.scss';
import { storage, firestore } from '../../firebase/firebase.utils';
import uuid from 'uuid';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../store/user/userSelectors';
import { IGlobalState } from '../../interfaces/states';
import { FirebaseUser } from '../../interfaces/types';

interface ICameraProps {
  setImageUrl: (imgUrl: string) => void;
  closeModal?: () => void;
}

const Camera = (props: ICameraProps) => {
  console.log('Camera');
  let titleInputRef = useRef<HTMLInputElement>(null);
  let videoRef = useRef<HTMLVideoElement>(null);
  let canvasRef = useRef<HTMLCanvasElement>(null);
  const currentUser = useSelector<IGlobalState, FirebaseUser>(selectCurrentUser);

  const mediaStream = useUserMedia({
    audio: false,
    video: { width: 300, height: 300 }
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

  const onCapture = async (blob: any) => {
    const imageUniqueName = uuid.v4();
    console.log('Unique image name', imageUniqueName);
    const imageUrl = await (
      await storage.ref(`images/${currentUser?.uid}/${imageUniqueName}.png`).put(blob)
    ).ref.getDownloadURL();

    let title: string = titleInputRef.current ? titleInputRef.current.value : '';

    try {
      firestore.collection('posts').add({
        imageUrl,
        title,
        createAt: new Date()
      });
    } catch (err) {
      console.error(err);
    } finally {
      if(props.closeModal){
        props.closeModal();
      }
    }

    props.setImageUrl(imageUrl);

    if (mediaStream) {
      mediaStream.getTracks()[0].stop();
    }
  };

  return (
    <form>
      <div>
        <video ref={videoRef} autoPlay muted />
        <canvas ref={canvasRef} width={300} height={300} />
      </div>
      <div>
        <input 
          type='text' 
          name='title' 
          ref={titleInputRef}
          placeholder='Title'/>
      </div>
      <button
        type='button'
        onClick={() => {
          if (canvasRef.current) {
            const context: CanvasRenderingContext2D = canvasRef.current.getContext('2d')!!;
            // This is for rotate the photo
            context.translate(300, 0);
            context.scale(-1, 1);

            if(videoRef.current){
              context.drawImage(videoRef.current, 0, 0, 300, 300);
              canvasRef.current.toBlob(
                (blob: any) => onCapture(blob),
                'image/jpeg',
                1
              );
            }
            
            context.clearRect(0, 0, 300, 300);
          }
        }}
      >
        Take photo
      </button>
    </form>
  );
};

export default Camera;
