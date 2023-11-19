import React from 'react';
import './MilestoneCard.css'; // Import the CSS file

const MilestoneCard = ({ name, deadline, onClick }) => {
    return (
        <div onClick={onClick} className="milestone-card">
            <div className="card-body">
                <div className="card-header">           
                    <h3 className="deadline">Until {deadline}</h3>
                    <div className="milestone-tag">
                        <h3 className="tag-text">MileStone</h3>
                    </div>                
                </div>
                <div>
                    <h2 className="milestone-name">{name}</h2>
                </div>
            </div>
        </div>
    );
}

export default MilestoneCard;
