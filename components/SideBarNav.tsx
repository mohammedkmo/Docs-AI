'use client'

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@radix-ui/react-collapsible";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { X } from 'lucide-react';

interface Section {
    id: string;
    title: string;
    level: number;
    subSections: string[];
}

interface SideBarNavProps {
    content: string;
    onClose?: () => void;
}

export default function SideBarNav({ content, onClose }: SideBarNavProps) {

    const [sections, setSections] = useState<Section[]>([]);

    useEffect(() => {
        // Split content into sections by headers
        const lines = content.split('\n');
        const extractedSections: Section[] = [];
        let currentSection: Section | null = null;

        lines.forEach((line) => {
            if (line.startsWith('#')) {
                // Count number of # to determine heading level
                const level = line.match(/^#+/)?.[0].length || 0;

                if (level === 1) {
                    // This is a main section (h1)
                    if (currentSection) {
                        extractedSections.push(currentSection);
                    }
                    const title = line.replace(/^#+\s+/, '');
                    const id = title.toLowerCase().replace(/[^\w]+/g, '-');
                    currentSection = {
                        id,
                        title,
                        level,
                        subSections: []
                    };
                } else if (level === 2 && currentSection) {
                    // This is a subsection (h2)
                    const subTitle = line.replace(/^#+\s+/, '');
                    currentSection.subSections.push(subTitle);
                }
            }
        });

        // Push the last section if exists
        if (currentSection) {
            extractedSections.push(currentSection);
        }

        setSections(extractedSections);
    }, [content]);

    return (
        <div className="relative">
            {/* Close button for mobile */}
            <button
                onClick={onClose}
                className="absolute top-0 right-0 p-2 text-gray-400 hover:text-gray-200 md:hidden"
            >
                <X className="h-5 w-5" />
            </button>

            <div className="sticky top-20">
                <nav className="space-y-1 pt-8 md:pt-0">
                    {sections.map((section, index) => {

                        return (
                            <div key={section.id} className="group">
                                <Collapsible>
                                    <CollapsibleTrigger asChild>
                                        <div 
                                            className="flex items-center justify-between w-full py-2 px-3 rounded-md hover:bg-violet-900/20 transition-colors"
                                            onClick={() => onClose?.()}
                                        >
                                            <a
                                                href={`#${section.id}`}
                                                className={`text-sm font-medium `}
                                            >
                                                {section.title}
                                            </a>
                                            {section.subSections.length > 0 && (
                                                <ChevronRight className={`h-4 w-4 text-gray-500 transition-transform`} />
                                            )}
                                        </div>
                                    </CollapsibleTrigger>
                                    {section.subSections.length > 0 && (
                                        <CollapsibleContent>
                                            <div className="ml-4 border-l border-violet-800">
                                                {section.subSections.map((subSection, subIndex) => {
                                                    const subSectionId = subSection.toLowerCase().replace(/[^\w]+/g, '-');
                                               

                                                    return (
                                                        <a
                                                            key={subIndex}
                                                            href={`#${subSectionId}`}
                                                            className={`block px-3 py-1 text-sm transition-colors `}
                                                        >
                                                            {subSection}
                                             
                                                        </a>
                                                    );
                                                })}
                                            </div>
                                        </CollapsibleContent>
                                    )}
                                </Collapsible>
                            </div>
                        );
                    })}
                </nav>
            </div>
        </div>
    )
}