import React, { useState } from 'react';
import { X } from 'lucide-react';
import ConfettiLandingPage from './ConfettiLandingPage';
import Form from './Form';

function App() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="App">
      {/* Pass the setShowForm function to the landing page */}
      <ConfettiLandingPage onShowForm={() => setShowForm(true)} />
      
      {/* Registration Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Enhanced Backdrop */}
          <div className="absolute inset-0 bg-black/90 backdrop-blur-xl">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 bg-[radial-gradient(white_1px,transparent_1px)] [background-size:50px_50px] opacity-10"></div>
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-pink-500/20 via-purple-500/15 to-transparent"></div>
          </div>
          
          {/* Modal Container */}
          <div className="relative bg-gradient-to-br from-black/90 via-purple-900/20 to-pink-900/20 rounded-2xl md:rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-pink-500/30 shadow-2xl shadow-pink-500/20 backdrop-blur-md">
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-black/80 to-purple-900/20 backdrop-blur-lg border-b border-pink-500/30 z-10 rounded-t-2xl md:rounded-t-3xl">
              <div className="flex justify-between items-center p-6">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                    Register for Confetti Circle Club 3.0
                  </h2>
                  <p className="text-sm text-purple-300 mt-1">Join 500+ Entrepreneurs & Industry Leaders</p>
                </div>
                <button
                  onClick={() => setShowForm(false)}
                  className="text-gray-400 hover:text-pink-400 transition-all transform hover:scale-110 rounded-full p-2 hover:bg-pink-500/20 border border-transparent hover:border-pink-500/30"
                  aria-label="Close form"
                >
                  <X size={24} />
                </button>
              </div>
            </div>
            
            {/* Form Content */}
            <div className="p-6 md:p-8">
              <Form onClose={() => setShowForm(false)} />
            </div>
            
            {/* Footer */}
            <div className="sticky bottom-0 bg-gradient-to-r from-black/80 to-purple-900/20 backdrop-blur-lg border-t border-purple-500/20 rounded-b-2xl md:rounded-b-3xl p-4">
              <div className="text-center">
                <p className="text-xs text-gray-400 mb-1">Limited spots available • Don't miss this opportunity</p>
                <div className="flex justify-center items-center space-x-4 text-xs text-purple-300">
                  <span className="flex items-center">
                    <span className="w-2 h-2 bg-pink-400 rounded-full mr-2 shadow-[0_0_8px_rgba(236,72,153,0.8)]"></span>
                    连接 Connect
                  </span>
                  <span className="flex items-center">
                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-2 shadow-[0_0_8px_rgba(168,85,247,0.8)]"></span>
                    启发 Inspire
                  </span>
                  <span className="flex items-center">
                    <span className="w-2 h-2 bg-pink-400 rounded-full mr-2 shadow-[0_0_8px_rgba(236,72,153,0.8)]"></span>
                    转化 Transform
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;