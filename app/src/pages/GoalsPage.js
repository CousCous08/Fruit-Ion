import React, { useEffect, useState, useRef } from 'react';
import GoalCard from '../components/GoalCard';
import './GoalsPage.css';



const GoalsPage = () => {
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

    const goals = [
        { id: 1, name: "Finish Project", deadline: "2023-01-15" },
        { id: 2, name: "Start New Course", deadline: "2023-02-10" },
        { id: 3, name: "Start New Course2", deadline: "2023-02-11" },
        { id: 4, name: "Start New Course3", deadline: "2023-02-12" },
        { id: 5, name: "Finish Project", deadline: "2023-01-15" },
        { id: 6, name: "Start New Course", deadline: "2023-02-10" },
        { id: 7, name: "Start New Course2", deadline: "2023-02-11" },
        { id: 8, name: "Start New Course3", deadline: "2023-02-12" },
    ];

    return (
        <div ref={containerRef} className="goals-container">
          <h1 className="goals-header" style={{ width: `${headerWidth}px` }}>Goals</h1>
          <div className="goals-list">
            {goals.map(goal => (
              <GoalCard key={goal.name} name={goal.name} deadline={goal.deadline} />
            ))}
          </div>
        </div>
      );
}

export default GoalsPage;
