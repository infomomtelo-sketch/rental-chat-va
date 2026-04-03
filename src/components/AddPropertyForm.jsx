import { useState } from 'react';

export default function AddPropertyForm({ onClose }) {
  const [form, setForm] = useState({
    title: '',
    price: '',
    description: '',
    bedrooms: '',
    bathrooms: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Property published successfully! Tenants can now see it and apply.');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-2xl w-full max-w-md p-6">
        <h2 className="text-2xl font-bold mb-6">Add New Property</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="text" 
            placeholder="Property Title (e.g. 1 Bedroom Trailer)" 
            className="w-full bg-gray-800 rounded-lg px-4 py-3" 
            value={form.title}
            onChange={(e) => setForm({...form, title: e.target.value})}
            required 
          />
          
          <input 
            type="number" 
            placeholder="Monthly Rent ($)" 
            className="w-full bg-gray-800 rounded-lg px-4 py-3" 
            value={form.price}
            onChange={(e) => setForm({...form, price: e.target.value})}
            required 
          />

          <div className="grid grid-cols-2 gap-4">
            <input 
              type="number" 
              placeholder="Bedrooms" 
              className="w-full bg-gray-800 rounded-lg px-4 py-3" 
              value={form.bedrooms}
              onChange={(e) => setForm({...form, bedrooms: e.target.value})}
            />
            <input 
              type="number" 
              placeholder="Bathrooms" 
              className="w-full bg-gray-800 rounded-lg px-4 py-3" 
              value={form.bathrooms}
              onChange={(e) => setForm({...form, bathrooms: e.target.value})}
            />
          </div>

          <textarea 
            placeholder="Description" 
            rows="4" 
            className="w-full bg-gray-800 rounded-lg px-4 py-3"
            value={form.description}
            onChange={(e) => setForm({...form, description: e.target.value})}
          />

          <div className="flex gap-3 pt-4">
            <button 
              type="button" 
              onClick={onClose} 
              className="flex-1 py-3 bg-gray-700 rounded-lg"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="flex-1 py-3 bg-blue-600 rounded-lg font-medium"
            >
              Publish Listing
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
