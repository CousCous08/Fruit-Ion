import React from 'react';
import './GoalCard.css';  

const GoalCard = ({ name, deadline }) => {
  return (
    <div className="goal-card">
      <h2>{name}</h2>
      <p>Deadline: {deadline}</p>
    </div>
  );
}

export default GoalCard;
