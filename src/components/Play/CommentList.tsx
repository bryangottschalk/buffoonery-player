import { CircularProgress } from '@material-ui/core';
import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { Comment } from '../';

export default function CommentList(): ReactElement {
  const { comments, loading, hasErrors, errorMsg } = useSelector(
    (state: any) => state
  ).websocket;
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
