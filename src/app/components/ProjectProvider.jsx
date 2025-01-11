'use client'
import React, { createContext, useContext, useState } from 'react';
import Image from 'next/image';
import AnimatedText from './AnimatedText';

// Create Context
const ProjectContext = createContext();

// Provider Component
export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);

  const addProject = (project) => {
    setProjects([...projects, project]);
  };

  return (
    <ProjectContext.Provider value={{ projects, addProject }}>
      {children}
    </ProjectContext.Provider>
  );
};

// Hook for using projects context
export const useProjects = () => useContext(ProjectContext);

// Modal Component
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-md p-6 bg-black border-2 border-yellow-500">
        <button 
          onClick={onClose}
          className="absolute top-2 right-2 text-yellow-500 hover:text-yellow-600"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

// Create Project Modal Component
export const CreateProjectModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [readmeLink, setReadmeLink] = useState('');
  const { addProject } = useProjects();

  const handleSubmit = (e) => {
    e.preventDefault();
    addProject({
      projectName,
      readmeLink,
      createdAt: new Date().toISOString()
    });
    setProjectName('');
    setReadmeLink('');
    setIsOpen(false);
  };

  return (
    <>
      <div className="relative cursor-pointer">
        <Image
          src="/images/hud/button.jpg"
          width={300}
          height={300}
          className='shadow-yellow-500 mix-blend-screen'
          alt="New Project Button"
        />
        <div 
          className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
          onClick={() => setIsOpen(true)}
        >
          <span className="text-yellow-500 text-2xl font-sddystopian font-bold">
            NEW PROJECT
          </span>
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="space-y-6">
          <h2 className="text-2xl font-sddystopian text-yellow-500 text-center">
            Create New Project
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col gap-2">
              <label className="text-yellow-500 font-sddystopian">Project Name</label>
              <input
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                required
                className="px-3 py-2 bg-black border border-yellow-500 text-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-yellow-500 font-sddystopian">README Link</label>
              <input
                value={readmeLink}
                onChange={(e) => setReadmeLink(e.target.value)}
                required
                className="px-3 py-2 bg-black border border-yellow-500 text-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            
            <button 
              type="submit"
              className="w-full px-4 py-2 bg-black border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black transition-colors duration-300 font-sddystopian"
            >
              Create Project
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
};