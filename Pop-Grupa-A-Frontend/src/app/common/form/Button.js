import React from 'react';
import Button from 'react-bootstrap/Button';

const StandardButton = ({onClick, label, ...other}) => {
  return (
    <Button variant="primary" onClick={onClick} {...other}>
      {label}
    </Button>
  )
};

export default StandardButton;