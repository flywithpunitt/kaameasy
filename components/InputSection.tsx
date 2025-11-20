import React, { useState } from 'react';
import { Search, Wand2, Loader2 } from 'lucide-react';

interface InputSectionProps {
  onGenerate: (prompt: string) => void;
  isLoading: boolean;
}

const InputSection: React.FC<InputSectionProps> = ({ onGenerate, isLoading }) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      onGenerate(prompt);
    }
  };

  return (
    <section className="max-w-3xl mx-auto mt-12 px-4">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Find the perfect shot, <span className="text-accent-400">faster.</span>
        </h2>
        <p className="text-editor-400 text-lg">
          Paste your client's vague request below. We'll translate it into professional stock footage keywords.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-accent-600 to-purple-600 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
        <div className="relative bg-editor-800 rounded-xl border border-editor-700 shadow-2xl p-2 flex flex-col md:flex-row gap-2">
          <div className="flex-1 flex items-center px-4">
            <Search className="w-5 h-5 text-editor-500 mr-3 flex-shrink-0" />
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder='e.g., "We need a video showing business growth but make it modern..."'
              className="w-full bg-transparent text-white placeholder-editor-500 focus:outline-none py-3 text-base"
              disabled={isLoading}
            />
          </div>
          <button
            type="submit"
            disabled={isLoading || !prompt.trim()}
            className="bg-accent-600 hover:bg-accent-500 text-white px-6 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed min-w-[140px]"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Researching
              </>
            ) : (
              <>
                <Wand2 className="w-5 h-5" />
                Generate
              </>
            )}
          </button>
        </div>
      </form>
      
      <div className="mt-4 flex flex-wrap justify-center gap-2 text-sm text-editor-500">
        <span>Try:</span>
        <button onClick={() => setPrompt("Stressed office worker late at night")} className="hover:text-accent-400 transition-colors">"Stressed office worker"</button>
        <span className="text-editor-700">•</span>
        <button onClick={() => setPrompt("Futuristic city with flying cars")} className="hover:text-accent-400 transition-colors">"Cyberpunk city"</button>
        <span className="text-editor-700">•</span>
        <button onClick={() => setPrompt("Happy family running on beach sunset")} className="hover:text-accent-400 transition-colors">"Family vacation"</button>
      </div>
    </section>
  );
};

export default InputSection;