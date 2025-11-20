import React, { useState } from 'react';
import Header from './components/Header';
import InputSection from './components/InputSection';
import ResultsSection from './components/ResultsSection';
import { generateKeywords } from './services/geminiService';
import { KeywordResponse } from './types';
import { AlertCircle } from 'lucide-react';

const App: React.FC = () => {
  const [data, setData] = useState<KeywordResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (prompt: string) => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const result = await generateKeywords(prompt);
      setData(result);
    } catch (err: any) {
      // User friendly error mapping
      if (err.message && err.message.includes("AIzaSyAuEUSYpTfXq28k9kiTsSywz8pvUYoRmuU")) {
        setError("API Configuration Error: API Key is missing.");
      } else {
        setError("Failed to generate keywords. Please try again or check your internet connection.");
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-editor-900 text-editor-100 font-sans selection:bg-accent-500/30 selection:text-accent-200">
      <Header />
      
      <main className="pb-20">
        <InputSection onGenerate={handleGenerate} isLoading={loading} />

        {error && (
          <div className="max-w-md mx-auto mt-8 p-4 bg-red-500/10 border border-red-500/50 rounded-lg flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-red-200 font-medium text-sm">Error</h3>
              <p className="text-red-300 text-sm mt-1">{error}</p>
            </div>
          </div>
        )}

        {!data && !loading && !error && (
          <div className="max-w-2xl mx-auto mt-20 text-center px-4 opacity-50">
             <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto mb-6">
                 <div className="h-2 bg-editor-700 rounded-full"></div>
                 <div className="h-2 bg-editor-700 rounded-full"></div>
                 <div className="h-2 bg-editor-700 rounded-full"></div>
             </div>
             <p className="text-editor-500 text-sm">Your results will appear here.</p>
          </div>
        )}

        {data && (
          <ResultsSection data={data} />
        )}
      </main>
      
      <footer className="border-t border-editor-800 mt-auto py-8 text-center text-editor-600 text-sm">
        <p>© {new Date().getFullYear()} Footage Finder AI. Designed for Creators.</p>
      </footer>
    </div>
  );
};

export default App;
