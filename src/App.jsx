// src/App.jsx
import { useState } from 'react';
import ChatScreen from './components/ChatScreen';
import AddPropertyForm from './components/AddPropertyForm';
import RentalApplicationForm from './components/RentalApplicationForm';

export default function App() {
  const [showAddProperty, setShowAddProperty] = useState(false);
  const [showApplication, setShowApplication] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);

  // Demo property for testing
  const demoProperty = {
    id: "prop-1",
    title: "1 Bedroom Trailer",
    price: "1200"
  };

  return (
    <div className="h-screen overflow-hidden">
      <ChatScreen />

      {/* Demo buttons for testing forms */}
      <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-40">
        <button 
          onClick={() => setShowAddProperty(true)}
          className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg text-sm"
        >
          + Add Property (Landlord)
        </button>
        <button 
          onClick={() => {
            setSelectedProperty(demoProperty);
            setShowApplication(true);
          }}
          className="bg-green-600 hover:bg-green-700 px-5 py-2 rounded-lg text-sm"
        >
          Apply as Tenant (Demo)
        </button>
      </div>

      {showAddProperty && <AddPropertyForm onClose={() => setShowAddProperty(false)} />}
      {showApplication && selectedProperty && (
        <RentalApplicationForm 
          property={selectedProperty} 
          onClose={() => setShowApplication(false)} 
        />
      )}
    </div>
  );
}
