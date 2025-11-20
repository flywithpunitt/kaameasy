import React from 'react';
import { KeywordResponse } from '../types';
import { Copy, Check, ExternalLink, Camera, Hash, Heart, Monitor, Search as SearchIcon, Pin, Youtube } from 'lucide-react';

interface ResultsSectionProps {
  data: KeywordResponse;
}

const CategoryCard: React.FC<{
  title: string;
  icon: React.ReactNode;
  keywords: string[];
  colorClass: string;
}> = ({ title, icon, keywords, colorClass }) => {
  const [copiedIndex, setCopiedIndex] = React.useState<number | null>(null);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  return (
    <div className="bg-editor-800 rounded-xl border border-editor-700 p-5 flex flex-col h-full hover:border-editor-600 transition-colors shadow-lg">
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-editor-700">
        <div className={`p-2 rounded-lg bg-editor-900 ${colorClass}`}>
          {icon}
        </div>
        <h3 className="font-semibold text-white text-lg">{title}</h3>
      </div>
      <div className="flex flex-wrap gap-2 content-start flex-grow">
        {keywords.map((keyword, idx) => (
          <button
            key={idx}
            onClick={() => copyToClipboard(keyword, idx)}
            className="group flex items-center gap-1.5 bg-editor-900 hover:bg-editor-700 text-editor-300 hover:text-white px-3 py-1.5 rounded-md text-sm transition-all border border-editor-700 hover:border-editor-500"
          >
            {keyword}
            {copiedIndex === idx ? (
              <Check className="w-3 h-3 text-green-400" />
            ) : (
              <Copy className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

const SearchLinkButton: React.FC<{
  platform: string;
  url: string;
  iconUrl?: string; // Using standard icons here instead
}> = ({ platform, url }) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center justify-between p-3 bg-editor-900 border border-editor-700 rounded-lg hover:bg-editor-800 hover:border-accent-500 transition-all group"
  >
    <span className="font-medium text-editor-300 group-hover:text-white">{platform}</span>
    <ExternalLink className="w-4 h-4 text-editor-500 group-hover:text-accent-400" />
  </a>
);

const ResultsSection: React.FC<ResultsSectionProps> = ({ data }) => {
  const generateUrl = (baseUrl: string, query: string) => {
      return `${baseUrl}${encodeURIComponent(query)}`;
  };

  // We use the first "Search Phrase" as the default query for the buttons
  const primaryQuery = data.searchPhrases[0] || data.literal[0] || "";

  return (
    <section className="max-w-6xl mx-auto px-4 py-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Search Phrases (Top Priority) */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
            <SearchIcon className="w-5 h-5 text-accent-400"/>
            <h3 className="text-lg font-semibold text-white">Optimized Search Queries</h3>
        </div>
        <div className="bg-gradient-to-r from-editor-800 to-editor-900 border border-editor-700 rounded-xl p-6">
             <div className="flex flex-col gap-3">
                {data.searchPhrases.map((phrase, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-editor-950/50 border border-editor-700/50 p-3 rounded-lg hover:border-accent-500/50 transition-colors group">
                        <span className="text-editor-200 font-mono text-sm md:text-base truncate mr-4">{phrase}</span>
                        <div className="flex items-center gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                            <button 
                                onClick={() => navigator.clipboard.writeText(phrase)}
                                className="p-2 hover:bg-editor-700 rounded-md text-editor-400 hover:text-white"
                                title="Copy"
                            >
                                <Copy className="w-4 h-4" />
                            </button>
                            <a 
                                href={`https://www.pinterest.com/search/pins/?q=${encodeURIComponent(phrase)}`}
                                target="_blank"
                                rel="noreferrer"
                                className="p-2 hover:bg-editor-700 rounded-md text-editor-400 hover:text-red-600"
                                title="Search Pinterest"
                            >
                                <Pin className="w-4 h-4" />
                            </a>
                            <a 
                                href={`https://www.youtube.com/results?search_query=${encodeURIComponent(phrase + " cinematic b-roll")}`}
                                target="_blank"
                                rel="noreferrer"
                                className="p-2 hover:bg-editor-700 rounded-md text-editor-400 hover:text-red-500"
                                title="Search YouTube"
                            >
                                <Youtube className="w-4 h-4" />
                            </a>
                        </div>
                    </div>
                ))}
             </div>
        </div>
      </div>

      {/* Keyword Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <CategoryCard 
          title="Literal" 
          icon={<Camera className="w-5 h-5 text-blue-400" />} 
          keywords={data.literal}
          colorClass="text-blue-400"
        />
        <CategoryCard 
          title="Conceptual" 
          icon={<Hash className="w-5 h-5 text-purple-400" />} 
          keywords={data.conceptual}
          colorClass="text-purple-400"
        />
        <CategoryCard 
          title="Vibe & Emotion" 
          icon={<Heart className="w-5 h-5 text-rose-400" />} 
          keywords={data.emotional}
          colorClass="text-rose-400"
        />
        <CategoryCard 
          title="Technical Specs" 
          icon={<Monitor className="w-5 h-5 text-emerald-400" />} 
          keywords={data.technical}
          colorClass="text-emerald-400"
        />
      </div>

      {/* Quick Links */}
      <div className="border-t border-editor-700 pt-8">
        <h3 className="text-lg font-semibold text-white mb-6 text-center">Quick Search on Platforms</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <SearchLinkButton platform="Pexels" url={generateUrl("https://www.pexels.com/search/videos/", primaryQuery)} />
            <SearchLinkButton platform="Shutterstock" url={generateUrl("https://www.shutterstock.com/video/search/", primaryQuery)} />
            <SearchLinkButton platform="Artgrid" url={generateUrl("https://artgrid.io/search?term=", primaryQuery)} />
            <SearchLinkButton platform="Pond5" url={generateUrl("https://www.pond5.com/stock-footage/", primaryQuery)} />
        </div>
        <p className="text-center text-editor-500 text-sm mt-4">
            Searching for: <span className="text-accent-400">"{primaryQuery}"</span>
        </p>
      </div>
    </section>
  );
};

export default ResultsSection;