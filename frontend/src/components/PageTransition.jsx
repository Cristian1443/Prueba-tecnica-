import React from 'react';

const PageTransition = ({ children, className = '' }) => {
  return (
    <div className={`page-transition fade-in ${className}`}>
      {children}
    </div>
  );
};

export default PageTransition; 