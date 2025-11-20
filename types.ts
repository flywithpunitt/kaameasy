import React from 'react';

// Define the structure of the AI response
export interface KeywordResponse {
  literal: string[];
  conceptual: string[];
  emotional: string[];
  technical: string[];
  searchPhrases: string[];
}

// Helper type for search platforms
export type SearchPlatform = 'YouTube' | 'Pexels' | 'Shutterstock' | 'Google' | 'Artgrid';

export interface SearchLink {
  name: SearchPlatform;
  urlTemplate: (query: string) => string;
  icon: React.ComponentType<any>;
}