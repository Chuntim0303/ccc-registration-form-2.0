import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import ConfettiLandingPage from './ConfettiLandingPage';
import Form from './Form';

function App() {
  const [showForm, setShowForm] = useState(false);

  // Prevent background scroll when form is open
  useEffect(() => {
    if (showForm) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount or state change
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showForm]);

  return (
    <div className="App relative min-h-screen bg-black text-white">
      {/* Background Elements (Extracted from ConfettiLandingPage - always visible) */}
      <div className="fixed inset-0 z-0">
        {/* Stars */}
        <div className="absolute inset-0 bg-[radial-gradient(white_1px,transparent_1px)] [background-size:50px_50px] opacity-20"></div>
        
        {/* Horizon Glow */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-pink-500/30 via-purple-500/20 to-transparent"></div>
        
        {/* Grid Floor */}
        <div className="absolute bottom-0 left-0 right-0 h-64 perspective-1000">
          <div 
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(236,72,153,0.3) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(236,72,153,0.3) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
              transform: 'rotateX(60deg) translateY(40px)',
              transformOrigin: 'bottom'
            }}
          ></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen">
        {showForm ? (
          /* Form Overlay - Form is the direct container/content */
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Semi-transparent Backdrop - allows background elements to show through */}
            <div 
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
              onClick={() => setShowForm(false)} // Click outside to close
            />
            
            {/* Form directly centered - no wrapper container; Form itself acts as the styled container */}
            <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <Form onClose={() => setShowForm(false)} />
            </div>
          </div>
        ) : (
          <ConfettiLandingPage onShowForm={() => setShowForm(true)} />
        )}
      </div>
    </div>
  );
}

export default App;