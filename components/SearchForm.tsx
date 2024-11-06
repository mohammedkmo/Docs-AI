"use client";

import { useState } from 'react';
import { ArrowUpRight, Loader2 } from 'lucide-react';
import { SUGGESTED_PROMPTS } from '@/lib/constants/prompts';
interface SearchFormProps {
    onSubmit: (query: string) => Promise<void>;
    isLoading: boolean;
}

export function SearchForm({ onSubmit, isLoading }: SearchFormProps) {
    const [query, setQuery] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            await onSubmit(query);
        }
    };

    return (
        <div>
            <div className="w-full space-y-4 relative">
                <div id="poda">
                    <div className="glow-css"></div>
                    <div className="darkBorderBg-css"></div>
                    <div className="white-css"></div>
                    <div className="border-css"></div>

                    <div id="main">
                        <form onSubmit={handleSubmit} className='w-full'>
                            <input
                                type="text"
                                className="input-css"
                                placeholder="What documentation do you need? Describe it here..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                            <div id="input-mask"></div>
                            <div id="pink-mask"></div>
                            <div className="filterBorder"></div>

                            {
                                isLoading && (
                                    <div className="text-sm text-gray-400 absolute right-16 top-1/2 -translate-y-1/2 animate-pulse">
                                        thinking...
                                    </div>
                                )
                            }

                            <div id="filter-icon">
                                {
                                    isLoading ? (
                                        <ArrowUpRight className="h-5 w-5 inline text-violet-400 animate-ping bg-transparent" />
                                    ) : (
                                        <ArrowUpRight className="h-5 w-5 inline text-violet-200 bg-transparent" />
                                    )
                                }
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap gap-4 justify-center mt-8">
                {SUGGESTED_PROMPTS.map((prompt, index) => (
                    <button
                        key={index}
                        className="text-sm text-gray-400 hover:text-violet-400 transition-colors"
                        onClick={() => setQuery(prompt)}
                    >
                        {prompt}
                        <ArrowUpRight className="h-4 w-4 inline ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </button>
                ))}
            </div>
        </div>
    );
}