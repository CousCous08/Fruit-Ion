import React from 'react';
import GoalCard from '../components/GoalCard';
import './GoalsPage.css';



const GoalsPage = () => {
    const goals = [
        { id: 1, name: "Finish Project", deadline: "2023-01-15" },
        { id: 2, name: "Start New Course", deadline: "2023-02-10" },
        { id: 3, name: "Start New Course2", deadline: "2023-02-11" },
        { id: 4, name: "Start New Course3", deadline: "2023-02-12" },
    ];

    return (
        <div className="goals-container">
            <h1 className="goals-header">Goals</h1>
            <div className="goals-list">
                {goals.map(goal => (
                    <GoalCard key={goal.name} name={goal.name} deadline={goal.deadline} />
                ))}
            </div>
        </div>
    );
}

export default GoalsPage;
