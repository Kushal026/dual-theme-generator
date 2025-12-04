import React, { useState } from 'react';
import { X } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (userData: { name: string; class: string; stream: string; location: string }) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [name, setName] = useState('');
  const [classLevel, setClassLevel] = useState('12');
  const [stream, setStream] = useState('Science');
  const [location, setLocation] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({
      name,
      class: classLevel,
      stream,
      location,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="card-elevated max-w-md w-full p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-foreground">Login to EduPath</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-secondary transition-colors"
          >
            <X className="w-6 h-6 text-muted-foreground" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="input-styled"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Class</label>
            <select
              value={classLevel}
              onChange={(e) => setClassLevel(e.target.value)}
              className="input-styled"
            >
              <option value="10">10th</option>
              <option value="11">11th</option>
              <option value="12">12th</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Stream</label>
            <select
              value={stream}
              onChange={(e) => setStream(e.target.value)}
              className="input-styled"
            >
              <option value="Science">Science</option>
              <option value="Commerce">Commerce</option>
              <option value="Arts">Arts</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              placeholder="City, State"
              className="input-styled"
            />
          </div>

          <button
            type="submit"
            className="w-full btn-primary"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};
