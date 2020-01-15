import React from 'react';
import { IPost } from '../../interfaces/models/post';
import { Card } from 'antd';

const { Meta } = Card;

interface IPostDetailProps {
  post?: IPost;
}

const PostDetail: React.FC<IPostDetailProps> = (props: IPostDetailProps) => {
  return (
      <Card
        cover={<img alt='example' src={props.post?.imageUrl || ''} />}
      >
        <Meta title={props.post?.title || 'Title'} />
      </Card>
    
  );
};

export default PostDetail;
