// src/components/ChatScreen.jsx
import { useState } from 'react';
import CabinetMenu from './CabinetMenu';

export default function ChatScreen({ conversationId = "demo-1", currentUserId = "landlord-1" }) {
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      senderId: "tenant-1", 
      text: "Hi, I'm interested in the 1 bedroom trailer.\n\nApplication:\nName: John Doe\nIncome: $4500/month\nReason: Closer to work\nPets: None", 
      isApplication: true 
    }
  ]);
  const [newText, setNewText] = useState('');
  const [status, setStatus] = useState('Application Received');
  const [menuOpen, setMenuOpen] = useState(false);
  const [aiSummary, setAiSummary] = useState(null);

  const handleSend = () => {
    if (!newText.trim()) return;
    setMessages([...messages, { id: Date.now(), senderId: currentUserId, text: newText }]);
    setNewText('');
  };

  const approveApplication = () => {
    setStatus('Approved');
    setMessages([...messages, { 
      id: Date.now(), 
      senderId: "system", 
      text: "✅ Application approved by landlord. Welcome! Let's schedule a showing.", 
      isSystem: true 
    }]);
  };

  const scheduleShowing = () => {
    setMessages([...messages, { 
      id: Date.now(), 
      senderId: "system", 
      text: "📅 Showing scheduled for next week. Please confirm a time.", 
      isSystem: true 
    }]);
  };

  // Simulate AI VA summary (Rental VA)
  const showAiSummary = () => {
    setAiSummary("AI VA Summary:\n• Income looks solid ($4500/mo)\n• No pets\n• Moving for work\nSuggested reply: 'Hi John, thanks for applying. When would you like to schedule a showing?'");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-950 text-white">
      {/* Normal Messenger Header */}
      <div className="bg-gray-900 p-4 flex items-center justify-between border-b border-gray-800">
        <button onClick={() => setMenuOpen(true)} className="text-3xl p-2">☰</button>
        
        <div className="text-center">
          <div className="font-semibold">Tenant Chat</div>
          <div className="text-xs text-green-400">{status}</div>
        </div>

        <div className="flex gap-2">
          <button onClick={showAiSummary} className="px-3 py-1 bg-purple-600 rounded text-xs">AI VA</button>
          <button onClick={approveApplication} className="px-4 py-1 bg-green-600 rounded text-sm">Approve</button>
          <button onClick={scheduleShowing} className="px-4 py-1 bg-blue-600 rounded text-sm">Schedule</button>
        </div>
      </div>

      {/* Messages Area - Normal Messenger Style */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-950">
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.senderId === currentUserId ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[75%] px-4 py-3 rounded-2xl ${msg.senderId === currentUserId ? 'bg-blue-600' : 'bg-gray-800'} ${msg.isSystem ? 'bg-gray-700 text-center text-sm' : ''} ${msg.isApplication ? 'border-l-4 border-yellow-500' : ''}`}>
              {msg.text}
            </div>
          </div>
        ))}

        {aiSummary && (
          <div className="bg-purple-900/50 border border-purple-600 p-4 rounded-2xl">
            <div className="text-purple-400 text-xs mb-1">Rental VA Suggestion</div>
            <p className="text-sm">{aiSummary}</p>
            <div className="mt-3 flex gap-2">
              <button onClick={() => setAiSummary(null)} className="text-xs px-3 py-1 bg-gray-700 rounded">Dismiss</button>
              <button onClick={() => {
                setMessages([...messages, { id: Date.now(), senderId: currentUserId, text: "Hi, thanks for applying. When would you like to schedule a showing?" }]);
                setAiSummary(null);
              }} className="text-xs px-3 py-1 bg-purple-600 rounded">Use this reply</button>
            </div>
          </div>
        )}
      </div>

      {/* Normal Messenger Input */}
      <div className="p-4 bg-gray-900 border-t border-gray-800">
        <div className="flex gap-2">
          <input
            type="text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type a message..."
            className="flex-1 bg-gray-800 rounded-full px-5 py-3 focus:outline-none"
          />
          <button onClick={handleSend} className="bg-blue-600 px-8 rounded-full font-medium">Send</button>
        </div>
      </div>

      {/* Cabinet Menu */}
      <CabinetMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </div>
  );
}
