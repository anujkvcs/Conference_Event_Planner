import React from 'react';
import "./TotalCost.css";

const TotalCost = ({ totalCosts, ItemsDisplay, handleClick }) => {
  return (
    <div className="pricing-app">
      <div className="display_box">
        <div className="header">
          <h3>Total cost for the event</h3>
        </div>
        <div className="cost-breakdown">
          <div className="cost-item">
            <span>Venue Cost:</span>
            <span>${totalCosts.venue}</span>
          </div>
          <div className="cost-item">
            <span>Add-ons Cost:</span>
            <span>${totalCosts.av}</span>
          </div>
          <div className="cost-item">
            <span>Meals Cost:</span>
            <span>${totalCosts.meals}</span>
          </div>
          <hr />
          <div className="cost-item total">
            <span>Total Cost:</span>
            <span>${totalCosts.total}</span>
          </div>
        </div>
        <div className="items-display">
          <ItemsDisplay />
        </div>
        <button onClick={handleClick} className="back-button">
          Back to Selection
        </button>
      </div>
    </div>
  );
};

export default TotalCost;
