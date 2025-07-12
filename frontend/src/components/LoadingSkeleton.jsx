import React from 'react';
import './LoadingSkeleton.css';

const LoadingSkeleton = ({ type = 'table', rows = 5 }) => {
  if (type === 'table') {
    return (
      <div className="loading-skeleton-container fade-in">
        <div className="skeleton-table">
          <div className="skeleton-header">
            <div className="skeleton-cell skeleton-shimmer"></div>
            <div className="skeleton-cell skeleton-shimmer"></div>
            <div className="skeleton-cell skeleton-shimmer"></div>
            <div className="skeleton-cell skeleton-shimmer"></div>
            <div className="skeleton-cell skeleton-shimmer"></div>
            <div className="skeleton-cell skeleton-shimmer"></div>
          </div>
          {Array.from({ length: rows }).map((_, index) => (
            <div key={index} className="skeleton-row" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="skeleton-cell skeleton-shimmer"></div>
              <div className="skeleton-cell skeleton-shimmer"></div>
              <div className="skeleton-cell skeleton-shimmer"></div>
              <div className="skeleton-cell skeleton-shimmer"></div>
              <div className="skeleton-cell skeleton-shimmer"></div>
              <div className="skeleton-cell skeleton-shimmer">
                <div className="skeleton-buttons">
                  <div className="skeleton-button skeleton-shimmer"></div>
                  <div className="skeleton-button skeleton-shimmer"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === 'card') {
    return (
      <div className="skeleton-card fade-in">
        <div className="skeleton-card-header skeleton-shimmer"></div>
        <div className="skeleton-card-body">
          <div className="skeleton-line skeleton-shimmer"></div>
          <div className="skeleton-line skeleton-shimmer"></div>
          <div className="skeleton-line skeleton-shimmer short"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="skeleton-default fade-in">
      <div className="skeleton-line skeleton-shimmer"></div>
      <div className="skeleton-line skeleton-shimmer"></div>
      <div className="skeleton-line skeleton-shimmer short"></div>
    </div>
  );
};

export default LoadingSkeleton; 