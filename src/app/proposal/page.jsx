'use client'
import React, { useState } from 'react';


const data = {
  items: [
    {
      id: 1,
      title: "Proposal 1",
      address: "0x123456789",
      votes: 78,
      type: 0, 
      tasks: [
        "Implement smart contract",
        "Design user interface",
        "Conduct security audit"
      ]
    },
    {
      id: 2,
      title: "Proposal 2",
      address: "0x987654321",
      votes: 45,
      type: 0, 
      tasks: [
        "Develop backend API",
        "Create documentation",
        "Deploy to testnet"
      ]
    },
    {
      id: 3,
      title: "Idea 1",
      address: "0xabcdef123",
      votes: 32,
      type: 1, 
      tasks: [
        "Research market viability",
        "Create prototype",
        "Gather user feedback"
      ]
    },
    {
      id: 4,
      title: "Idea 2",
      address: "0x456789abc",
      votes: 27,
      type: 1, 
      tasks: [
        "Define scope",
        "Create mockups",
        "Present to stakeholders"
      ]
    }
  ]
};

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md m-4">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

function Page() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeView, setActiveView] = useState('proposals'); 

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const filteredItems = data.items.filter(item => 
    (activeView === 'proposals' && item.type === 0) || 
    (activeView === 'ideas' && item.type === 1)
  );

  return (
    <div className="w-[95vw] h-screen">
      <div className="w-full flex justify-around text-6xl font-cyberalert p-4 mx-12 pb-1">
        <div 
          className={`cursor-pointer p-4 w-full text-center rounded-lg ${
            activeView === 'proposals' 
              ? 'bg-yellow-500 text-black' 
              : 'hover:bg-yellow-500 hover:text-black'
          }`}
          onClick={() => setActiveView('proposals')}
        >
          Proposal
        </div>
        <div 
          className={`cursor-pointer p-4 w-full text-center rounded-lg ${
            activeView === 'ideas' 
              ? 'bg-yellow-500 text-black' 
              : 'hover:bg-yellow-500 hover:text-black'
          }`}
          onClick={() => setActiveView('ideas')}
        >
          Idea
        </div>
      </div>

      <div className="flex flex-col">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => handleItemClick(item)}
            className="flex justify-between h-full p-4 mx-12 rounded-lg cursor-pointer hover:bg-yellow-500 hover:text-black"
          >
            <div className="flex flex-col">
              <div className="text-2xl font-helvetica">{item.title}</div>
              <div className="text-2l font-helvetica">{item.address}</div>
            </div>
            <div className="text-2xl font-helvetica items-center">
              {item.votes}
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {selectedItem && (
          <div>
            <h2 className="text-2xl font-bold mb-4">
              {selectedItem.title} Tasks
            </h2>
            <ul className="space-y-2">
              {selectedItem.tasks.map((task, index) => (
                <li
                  key={index}
                  className="p-2 bg-gray-100 rounded"
                >
                  {task}
                </li>
              ))}
            </ul>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default Page;