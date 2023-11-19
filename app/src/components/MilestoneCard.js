import React from 'react';


const MilestoneCard = ({ name, deadline, onClick }) => {
  return (
    <div onClick={onClick} style={{ cursor: 'pointer' }}>
      <div class="flex flex-col rounded-xl bg-white p-4 shadow-lg w-full">
        <div class="mb-2 flex justify-between">           
          <h3 class="text-sm">Until {deadline}</h3>
          <div className='px-2 py-1 border-2 border-yellow-300 rounded-md'>
            <h3 className='font-light text-yellow-300 text-sm'>MileStone</h3>
          </div>                
        </div>
        <div>
          <h2 className="font-semibold">{name}</h2>
        </div>
      </div>
    </div>
  );
}

export default MilestoneCard;
