"use client";

import { useState } from 'react';
import { SearchForm } from '@/components/SearchForm';
import { DocViewer } from '@/components/DocViewer';
import Header from '@/components/Header';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(true);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) throw new Error('Failed to generate documentation');
      const data = await response.json();
      setContent(data.content);
      setIsSearchVisible(false);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen">
      <div>
        {isSearchVisible ? (
          <div className="h-full flex items-center justify-center min-h-screen">
            <div className="max-w-3xl w-full animate-fade-in">


            <div className='bg-grid h-full w-full absolute top-0 left-0'></div>
            <h1 className="text-4xl font-semibold text-center mb-8">
                DocsAI, Made Simple
            </h1>

              <SearchForm onSubmit={handleSearch} isLoading={isLoading} />



            </div>
          </div>
        ) : (
          <div>
            <Header setIsSearchVisible={setIsSearchVisible} />


            <div className="py-8">
              {content && (
                <div className="container animate-fade-in">
                  <DocViewer content={content} />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}