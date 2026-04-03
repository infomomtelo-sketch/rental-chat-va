// src/components/RentalApplicationForm.jsx
import { useState } from 'react';

export default function RentalApplicationForm({ property, onClose }) {
  const [form, setForm] = useState({
    name: '', 
    email: '', 
    phone: '', 
    income: '', 
    reason: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Application for "${property.title}" submitted!\n\nThe landlord has been notified and will review it in the chat.`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-2xl w-full max-w-md p-6">
        <h2 className="text-2xl font-bold mb-2">Rental Application</h2>
        <p className="text-gray-400 mb-6">{property.title} — ${property.price}/month</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="text" 
            placeholder="Full Name" 
            className="w-full bg-gray-800 rounded-lg px-4 py-3" 
            required
            value={form.name} 
            onChange={e => setForm({...form, name: e.target.value)} 
          />
          
          <input 
            type="email" 
            placeholder="Email" 
            className="w-full bg-gray-800 rounded-lg px-4 py-3" 
            required
            value={form.email} 
            onChange={e => setForm({...form, email: e.target.value)} 
          />

          <input 
            type="tel" 
            placeholder="Phone Number" 
            className="w-full bg-gray-800 rounded-lg px-4 py-3" 
            required
            value={form.phone} 
            onChange={e => setForm({...form, phone: e.target.value)} 
          />

          <input 
            type="number" 
            placeholder="Monthly Income ($)" 
            className="w-full bg-gray-800 rounded-lg px-4 py-3" 
            required
            value={form.income} 
            onChange={e => setForm({...form, income: e.target.value)} 
          />

          <textarea 
            placeholder="Reason for moving" 
            rows="3" 
            className="w-full bg-gray-800 rounded-lg px-4 py-3"
            value={form.reason} 
            onChange={e => setForm({...form, reason: e.target.value)} 
          />

          <div className="flex gap-3 pt-6">
            <button 
              type="button" 
              onClick={onClose} 
              className="flex-1 py-3 bg-gray-700 rounded-lg"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="flex-1 py-3 bg-green-600 rounded-lg font-medium"
            >
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
