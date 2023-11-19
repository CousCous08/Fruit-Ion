
import React from 'react';
import { useLocation } from 'react-router-dom';

const MilestonesPage = () => {
  const location = useLocation();
  const goal = location.state.goal;

  return (
    <div>
      <h1>{goal.name}</h1>
      <p>Deadline: {goal.deadline}</p>
      <h3>Milestones</h3>
      <ul>
        {goal.milestones.map((milestone, index) => (
          <li key={index}>{milestone}</li>
        ))}
      </ul>
    </div>
  );
};

export default MilestonesPage;

