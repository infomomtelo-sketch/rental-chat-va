// src/components/CabinetMenu.jsx
import { useState } from 'react';

export default function CabinetMenu({ isOpen, onClose }) {
  const [openSections, setOpenSections] = useState({
    inbox: true,
    properties: false,
  });

  const toggleSection = (section) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/70 z-50" onClick={onClose}></div>
      )}

      <div className={`fixed top-0 left-0 h-full w-80 bg-gray-900 border-r border-gray-800 transform transition-transform duration-300 z-50 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold">Rental VA</h1>
            <button onClick={onClose} className="text-3xl">✕</button>
          </div>

          {/* Inbox Section */}
          <div className="mb-6">
            <button 
              onClick={() => toggleSection('inbox')}
              className="w-full text-left flex justify-between items-center py-3 text-lg font-medium"
            >
              Inbox
              <span>{openSections.inbox ? '▼' : '▶'}</span>
            </button>
            {openSections.inbox && (
              <div className="pl-4 space-y-2 text-sm text-gray-400">
                <div className="py-2 border-l-2 border-blue-500 pl-3">John Doe - Application Received</div>
                <div className="py-2 border-l-2 border-gray-700 pl-3">Sarah Lee - Approved</div>
              </div>
            )}
          </div>

          {/* My Properties Section */}
          <div>
            <button 
              onClick={() => toggleSection('properties')}
              className="w-full text-left flex justify-between items-center py-3 text-lg font-medium"
            >
              My Properties
              <span>{openSections.properties ? '▼' : '▶'}</span>
            </button>
            {openSections.properties && (
              <div className="pl-4 space-y-2 text-sm text-gray-400">
                <div className="py-2">1 Bedroom Trailer - $1,200/mo</div>
                <div className="py-2 text-green-400">+ Add New Property</div>
              </div>
            )}
          </div>

          <div className="mt-12 text-xs text-gray-500">
            Rental VA • You are in full control
          </div>
        </div>
      </div>
    </>
  );
}
