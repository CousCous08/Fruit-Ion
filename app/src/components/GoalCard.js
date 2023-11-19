import React from 'react';
import './GoalCard.css';  

const GoalCard = ({ name, deadline, milestones, onClick }) => {
  return (
    <div onClick={onClick} style={{ cursor: 'pointer' }}>
      <div class="flex items-start rounded-xl bg-white p-4 shadow-lg">
        <div class="flex h-12 w-12 items-center justify-center rounded-full border border-blue-100 bg-blue-50">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
          </svg>
        </div>

        <div class="ml-4">
          <h2 class="font-semibold">Get a duck</h2>
          <p class="mt-2 text-sm text-gray-500">Next Milestone/Habit: Convince dad</p>
        </div>
      </div>
      {/* <h2>{name}</h2>
      <p>Deadline: {deadline}</p> */}
    </div>
  );
}

export default GoalCard;
