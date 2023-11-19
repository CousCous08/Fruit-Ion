import React from 'react';
import './HabitCard.css'; // Import the CSS file

const HabitCard = ({ name, milestones, onClick }) => {
  return (
    <div onClick={onClick} className="habit-card">
      <div className="card-container">
        <div className="icon-and-habit-name">
          <div className="icon-container">
            <svg xmlns="http://www.w3.org/2000/svg" className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
            </svg>
          </div>

          <div className="text-content">
            <h2 className="habit-name">{name}</h2>
            {/* <p className="habit-details">Next Milestone/Habit: {milestones[0].name}</p> */}
          </div>
        </div>

        <div className="habit-tag">
          <h3 className="habit-tag-text">Habit</h3>
        </div>
      </div>
    </div>
  );
}

export default HabitCard;
