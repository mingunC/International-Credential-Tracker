import React from 'react';
import { Spinner, Container } from 'react-bootstrap';

const Loading = ({ message = 'Loading...', size = 'border', variant = 'primary' }) => {
  return (
    <Container className="py-5">
      <div className="text-center">
        <Spinner animation={size} variant={variant} />
        <p className="mt-3 text-muted">{message}</p>
      </div>
    </Container>
  );
};

export default Loading;
