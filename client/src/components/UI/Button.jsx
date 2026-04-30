import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', // primary, secondary, danger, ghost
  type = 'button', 
  className = '', 
  onClick, 
  disabled = false,
  ...props 
}) => {
  return (
    <button
      type={type}
      className={`btn btn-${variant} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
