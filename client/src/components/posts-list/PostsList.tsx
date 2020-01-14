import React from 'react';
import { Row, Col, Card } from 'antd';
import { IPost } from '../../interfaces/models/post';
import './PostsList.scss';

interface IPostsListProps {
  posts: IPost[];
}

const PostsList: React.FC<IPostsListProps> = (props: IPostsListProps) => {
  return (
    <Row>
      {props.posts.map((post: IPost, index: number) => (
        <Col xs={24} md={12} lg={8}>
          <Card
            bordered={false}
            cover={<img
              className='imageCover'
              alt='example'
              src={post.imageUrl}
            />}
          />
        </Col>
      ))}
    </Row>
  );
};

export default PostsList;
