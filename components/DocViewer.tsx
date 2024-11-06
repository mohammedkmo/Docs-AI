"use client";

import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Copy, Check, Menu } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { GeistMono } from 'geist/font/mono';
import SideBarNav from './SideBarNav';

interface DocViewerProps {
  content: string;
}

export function DocViewer({ content }: DocViewerProps) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);


  const handleCopyCode = async (code: string) => {
    await navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="relative">
      {/* Mobile Menu Button */}
      <button 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed bottom-4 left-4 z-50 p-2 bg-background/80 backdrop-blur-sm rounded-lg border border-border md:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="grid md:grid-cols-[240px_1fr] gap-8">
        {/* Sidebar */}
        <div className={`
          fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:sticky md:top-20 md:h-[calc(100vh-5rem)] md:bg-transparent md:backdrop-blur-none
          transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:transform-none md:translate-x-0
        `}>
          <div className="h-full w-[240px] overflow-y-auto p-4 md:p-0">
            <SideBarNav content={content} onClose={() => setIsSidebarOpen(false)} />
          </div>
        </div>

        {/* Main Content */}
        <div className="min-w-0 pb-16 px-4 md:px-0">
          <article className="prose prose-invert max-w-none">
            <ReactMarkdown
              className="[&>*:first-child]:mt-0"
              components={{
                h1: ({node, ...props}) => (
                  <h1 
                    id={props.children?.toString().toLowerCase().replace(/[^\w]+/g, '-')} 
                    className="scroll-mt-24 text-2xl font-bold tracking-tight text-white mb-4"
                    {...props} 
                  />
                ),
                h2: ({node, ...props}) => (
                  <h2 
                    id={props.children?.toString().toLowerCase().replace(/[^\w]+/g, '-')} 
                    className="scroll-mt-24 text-xl font-semibold tracking-tight text-white mt-16 mb-4"
                    {...props}
                  />
                ),
                h3: ({node, ...props}) => (
                  <h3 
                    id={props.children?.toString().toLowerCase().replace(/[^\w]+/g, '-')} 
                    className="scroll-mt-24 text-lg font-semibold tracking-tight text-white mt-12 mb-4"
                    {...props}
                  />
                ),
                h4: ({node, ...props}) => (
                  <h4 
                    id={props.children?.toString().toLowerCase().replace(/[^\w]+/g, '-')} 
                    className="scroll-mt-24 text-base font-semibold tracking-tight text-white mt-12 mb-4"
                    {...props}
                  />
                ),
                h5: ({node, ...props}) => (
                  <h5 
                    id={props.children?.toString().toLowerCase().replace(/[^\w]+/g, '-')} 
                    className="scroll-mt-24 text-sm font-semibold tracking-tight text-white mt-12 mb-4"
                    {...props}
                  />
                ),
                p: ({node, ...props}) => (
                  <p className="leading-7 text-gray-200 mb-6" {...props} />
                ),
                a: ({node, ...props}) => (
                  <a 
                    className="text-violet-400 hover:text-violet-300 underline decoration-violet-700 underline-offset-2 hover:decoration-violet-600"
                    {...props}
                  />
                ),
                ul: ({node, ...props}) => (
                  <ul className="my-6 list-disc pl-8 text-gray-200" {...props} />
                ),
                ol: ({node, ...props}) => (
                  <ol className="my-6 list-decimal pl-8 text-gray-200" {...props} />
                ),
                blockquote: ({node, ...props}) => (
                  <blockquote 
                    className="border-l-4 border-violet-800 pl-6 italic text-gray-300 my-8" 
                    {...props}
                  />
                ),
                code: ({className, children, ...props}) => {
                  const match = /language-(\w+)/.exec(className || '');
                  const inline = !className;
                  const codeString = String(children).replace(/\n$/, '');
                  const language = match ? match[1] : '';
                  
                  return inline ? (
                    <code 
                      className={`px-1.5 py-0.5 rounded-md bg-gray-800 text-gray-200 ${GeistMono.className}`}
                      {...props}
                    >
                      {children}
                    </code>
                  ) : (
                    <div className="relative my-6 rounded-lg overflow-hidden bg-[#282a36]">
                      <div className="absolute right-4 top-4 z-10">
                        <button
                          onClick={() => handleCopyCode(codeString)}
                          className="p-2 text-gray-400 hover:text-gray-300 transition-colors"
                        >
                          {copiedCode === codeString ? (
                            <Check className="h-4 w-4" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                      <SyntaxHighlighter
                        language={language}
                        style={dracula}
                        customStyle={{
                          fontFamily: GeistMono.style.fontFamily,
                          margin: 0,
                          padding: '1.5rem',
                          fontSize: '0.800rem',
                          textShadow: 'none',
                          background: '#181818'
                        }}
                        wrapLongLines={true}
                      >
                        {codeString}
                      </SyntaxHighlighter>
                    </div>
                  );
                },
                table: ({node, ...props}) => (
                  <div className="my-8 overflow-x-auto">
                    <table className="w-full text-left border-collapse text-gray-200" {...props} />
                  </div>
                ),
                th: ({node, ...props}) => (
                  <th 
                    className="py-3 px-4 font-semibold text-white border-b border-gray-800" 
                    {...props} 
                  />
                ),
                td: ({node, ...props}) => (
                  <td 
                    className="py-3 px-4 text-gray-200 border-b border-gray-800" 
                    {...props}
                  />
                ),
                img: ({node, ...props}) => (
                  <img 
                    className="rounded-lg border border-gray-800 my-8" 
                    {...props}
                  />
                )
              }}
            >
              {content}
            </ReactMarkdown>
          </article>
        </div>
      </div>
    </div>
  );
}