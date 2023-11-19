import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import MilestoneCard from '../components/MilestoneCard';
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
              <div className='w-full'>
                  <MilestoneCard
                      key={ms.id}
                      name={ms.name}
                      deadline={ms.deadline}
                  />
              </div>
          ))}
      </div>
    </div>
  );
};

export default MilestonesPage;

