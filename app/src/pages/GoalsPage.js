import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import GoalCard from '../components/GoalCard';
import './GoalsPage.css';



const GoalsPage = () => {
    const [headerWidth, setHeaderWidth] = useState(0);
    const containerRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const updateWidth = () => {
            if (containerRef.current) {
                setHeaderWidth(containerRef.current.offsetWidth);
            }
        };

        window.addEventListener('resize', updateWidth);
        updateWidth();

        return () => window.removeEventListener('resize', updateWidth);
    }, []);

    const goals = [
        { id: 1, name: "Finish Project", milestones: [{id:1, name: "Find a good research topic after asking 100 random people and some random words I'm going to ramble just to test and see how it treats long sentences", deadline: "2023-01-04"}, {id:2, name: "Create Outline", deadline: "2023-01-04"}, {id:3, name: "First Draft", deadline: "2023-01-04"}], habits: [{id:1, name: "read a chapter", frequency: "MWF"}] },
        { id: 2, name: "Start New Course", milestones: [{id:1, name: "Research topic", deadline: "2023-01-04"}, {id:2, name: "Create Outline", deadline: "2023-01-04"}, {id:3, name: "First Draft", deadline: "2023-01-04"}], habits: [{id:1, name: "read a chapter", frequency: "MWF"}] },
        { id: 3, name: "Start New Course2", milestones: [{id:1, name: "Research topic", deadline: "2023-01-04"}, {id:2, name: "Create Outline", deadline: "2023-01-04"}, {id:3, name: "First Draft", deadline: "2023-01-04"}], habits: [{id:1, name: "read a chapter", frequency: "MWF"}] },
        { id: 4, name: "Start New Course3", milestones: [{id:1, name: "Research topic", deadline: "2023-01-04"}, {id:2, name: "Create Outline", deadline: "2023-01-04"}, {id:3, name: "First Draft", deadline: "2023-01-04"}], habits: [{id:1, name: "read a chapter", frequency: "MWF"}] },
        { id: 5, name: "Finish Project", milestones: [{id:1, name: "Research topic", deadline: "2023-01-04"}, ], habits: [{id:1, name: "read a chapter", frequency: "MWF"}] },
        { id: 6, name: "Start New Course", milestones: [{id:1, name: "Research topic", deadline: "2023-01-04"}, {id:2, name: "Create Outline", deadline: "2023-01-04"}, {id:3, name: "First Draft", deadline: "2023-01-04"}], habits: [{id:1, name: "read a chapter", frequency: "MWF"}] },
        { id: 7, name: "Start New Course2", milestones: [{id:1, name: "Research topic", deadline: "2023-01-04"}, {id:2, name: "First Draft", deadline: "2023-01-04"}], habits: [{id:1, name: "read a chapter", frequency: "MWF"}] },
        { id: 8, name: "Start New Course3", milestones: [{id:1, name: "Research topic", deadline: "2023-01-04"}, {id:2, name: "Create Outline", deadline: "2023-01-04"}, {id:3, name: "First Draft", deadline: "2023-01-04"}], habits: [{id:1, name: "read a chapter", frequency: "MWF"}] }
    ];

    const handleGoalClick = (goal) => {
        // Navigate to the detailed goal page
        navigate(`/goals/${goal.id}`, { state: { goal } });
    };

    return (
        <div ref={containerRef} className="goals-container">
            <h1 className="goals-header" style={{ width: `${headerWidth}px` }}>Goals</h1>
            <div className="goals-list grid">
                {goals.map(goal => (
                    <div className='w-full'>
                        <GoalCard
                            key={goal.id}
                            name={goal.name}
                            milestones={goal.milestones}
                            onClick={() => handleGoalClick(goal)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default GoalsPage;
