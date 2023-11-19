import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import MilestoneCard from '../components/MilestoneCard';
import HabitCard from '../components/HabitCard';
import './MilestonesPage.css';

const MilestonesPage = () => {
    const location = useLocation();
    const goal = location.state.goal;

    const [headerWidth, setHeaderWidth] = useState(0);
    const containerRef = useRef(null);

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

    return (
        <div ref={containerRef} className="ms-container">
            <h1 className="ms-header" style={{ width: `${headerWidth}px` }}>{goal.name}</h1>

            <div className="ms-list grid">
                {goal.milestones.map(ms => (
                    <div className='w-full' key={ms.id}>
                        <MilestoneCard
                            name={ms.name}
                            deadline={ms.deadline}
                        />
                    </div>
                ))}
            </div>

            {/* Habit Cards Section */}
            {/* <h2 className="ms-header">Habits</h2> */}
            <div className="ms-list grid">
                {goal.habits.map(habit => (
                    <div className='w-full' key={habit.id}>
                        <HabitCard
                            name={habit.name}
                        // include other properties as needed
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MilestonesPage;

