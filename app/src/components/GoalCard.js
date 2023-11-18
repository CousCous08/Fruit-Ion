import React from 'react';
import './GoalCard.css';  

const GoalCard = ({ name, deadline, milestones, onClick }) => {
  return (
    <div className="goal-card" onClick={onClick} style={{ cursor: 'pointer' }}>
      <h2>{name}</h2>
      <p>Deadline: {deadline}</p>
    </div>
  );
}

export default GoalCard;
