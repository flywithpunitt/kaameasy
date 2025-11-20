import React from 'react';
import { Film, Video, Zap } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="border-b border-editor-700 bg-editor-900/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-accent-600 rounded-lg shadow-lg shadow-accent-600/20">
            <Video className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">Footage Finder AI</h1>
            <p className="text-xs text-editor-400 font-medium">For Professional Editors</p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-4 text-sm text-editor-400">
          <span className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-yellow-400" />
            Powered by Gemini 2.5 Flash
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;