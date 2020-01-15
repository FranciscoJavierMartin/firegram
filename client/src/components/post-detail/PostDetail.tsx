import React from 'react';
import { IPost } from '../../interfaces/models/post';
import styles from './PostDetail.module.scss';

interface IPostDetailProps {
  post?: IPost;
}

const PostDetail: React.FC<IPostDetailProps> = (props: IPostDetailProps) => {
  return (
      <div className={styles.container}>
        <div className={styles.postImage}>
          <img alt='example' src={props.post?.imageUrl || ''} />
        </div>
        <div className={styles.postText}>
          <strong>{props.post?.title || 'Title'}</strong>
          <div className={styles.comments}>
            {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25]
              .map((comment: number) => {
              return (
                <div key={comment}>
                  <span >Coment {comment}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
  );
};

export default PostDetail;
