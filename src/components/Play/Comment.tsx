import React, { ReactElement } from 'react';

interface Props {
  comment: any;
}

export default function Comment({ comment }: Props): ReactElement {
  return (
    <div>{`${comment.timestamp} ${comment.name}: ${comment.chatMsg}`}</div>
  );
}
