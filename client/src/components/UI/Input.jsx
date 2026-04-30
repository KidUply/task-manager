import React, { forwardRef } from 'react';

const Input = forwardRef(({ 
  label, 
  error, 
  className = '', 
  containerClassName = '',
  ...props 
}, ref) => {
  return (
    <div className={`form-group ${containerClassName}`}>
      {label && <label className="form-label">{label}</label>}
      <input
        ref={ref}
        className={`form-control ${className}`}
        {...props}
      />
      {error && (
        <span className="text-sm text-red-500 mt-1 block" style={{ color: 'var(--accent-danger)' }}>
          {error}
        </span>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
