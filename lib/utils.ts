import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



export function extractSections(markdown: string) {
  const sections = [];
  const lines = markdown.split('\n');
  const usedIds = new Set();
  
  for (const line of lines) {
    if (line.startsWith('#')) {
      const title = line.replace(/^#+\s+/, '');
      let id = title.toLowerCase().replace(/[^\w]+/g, '-');
      
      // Ensure unique IDs
      let counter = 1;
      let uniqueId = id;
      while (usedIds.has(uniqueId)) {
        uniqueId = `${id}-${counter}`;
        counter++;
      }
      usedIds.add(uniqueId);
      
      sections.push({ title, id: uniqueId });
    }
  }
  
  return sections;
}

export function addIdsToHeadings(markdown: string) {
  const usedIds = new Set();
  
  return markdown.replace(/^(#+)\s+(.+)$/gm, (match, hashes, title) => {
    let id = title.toLowerCase().replace(/[^\w]+/g, '-');
    
    // Ensure unique IDs
    let counter = 1;
    let uniqueId = id;
    while (usedIds.has(uniqueId)) {
      uniqueId = `${id}-${counter}`;
      counter++;
    }
    usedIds.add(uniqueId);
    
    return `${hashes} ${title} {#${uniqueId}}`;
  });
}