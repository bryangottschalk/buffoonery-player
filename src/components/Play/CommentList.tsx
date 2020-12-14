import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { Comment } from '../';
interface Props {}

export default function CommentList({}: Props): ReactElement {
  const { comments } = useSelector((state: any) => state).websocket;
  return (
    <div style={{ height: 300, overflow: 'scroll' }}>
      <h1>Comments</h1>
      <div style={{ textAlign: 'left', margin: '0px 20px' }}>
        {comments &&
          comments.length > 0 &&
          comments.map((comment: any, idx: number) => (
            <Comment comment={comment} key={idx} />
          ))}
      </div>
    </div>
  );
}
