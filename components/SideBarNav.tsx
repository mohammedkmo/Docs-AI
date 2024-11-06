'use client'

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@radix-ui/react-collapsible";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

interface Section {
    id: string;
    title: string;
    level: number;
    subSections: string[];
}

export default function SideBarNav({ content }: { content: string }) {

    const [sections, setSections] = useState<Section[]>([]);
    const [activeSection, setActiveSection] = useState<string>('');

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

        const observer = new IntersectionObserver(
            (entries) => {
                let maxVisibility = 0;
                let mostVisibleSection = '';

                entries.forEach((entry) => {
                    const intersectionRatio = entry.intersectionRatio;
                    if (intersectionRatio > maxVisibility) {
                        maxVisibility = intersectionRatio;
                        mostVisibleSection = entry.target.id;
                    }
                });

                if (mostVisibleSection) {
                    setActiveSection(mostVisibleSection);
                }
            },
            {
                rootMargin: '-100px 0px -66%',
                threshold: Array.from({ length: 100 }, (_, i) => i / 100)
            }
        );

        const observeElements = () => {
            extractedSections.forEach(({ id }) => {
                const element = document.getElementById(id);
                if (element) observer.observe(element);
            });
        };

        if (document.readyState === 'complete') {
            observeElements();
        } else {
            window.addEventListener('load', observeElements);
        }

        return () => {
            observer.disconnect();
            window.removeEventListener('load', observeElements);
        };
    }, [content]);

    return (
        <div className="relative">
            <div className="sticky top-20">
                <nav className="space-y-1">
                    {sections.map((section, index) => {
                        const isActive = section.id === activeSection;

                        return (
                            <div key={section.id} className="group">
                                <Collapsible>
                                    <CollapsibleTrigger asChild>
                                        <div className="flex items-center justify-between w-full py-2 px-3 rounded-md hover:bg-violet-900/20 transition-colors">
                                            <a
                                                href={`#${section.id}`}
                                                className={`text-sm font-medium ${isActive
                                                        ? 'text-violet-400'
                                                        : 'text-gray-300 hover:text-violet-400'
                                                    }`}
                                            >
                                                {section.title}
                                                {isActive && (
                                                    <span className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-violet-400" />
                                                )}
                                            </a>
                                            {section.subSections.length > 0 && (
                                                <ChevronRight className={`h-4 w-4 text-gray-500 transition-transform ${isActive ? 'rotate-90' : ''}`} />
                                            )}
                                        </div>
                                    </CollapsibleTrigger>
                                    {section.subSections.length > 0 && (
                                        <CollapsibleContent>
                                            <div className="ml-4 border-l border-violet-800">
                                                {section.subSections.map((subSection, subIndex) => {
                                                    const subSectionId = subSection.toLowerCase().replace(/[^\w]+/g, '-');
                                                    const isSubActive = subSectionId === activeSection;

                                                    return (
                                                        <a
                                                            key={subIndex}
                                                            href={`#${subSectionId}`}
                                                            className={`block px-3 py-1 text-sm transition-colors ${isSubActive
                                                                    ? 'text-violet-400'
                                                                    : 'text-gray-400 hover:text-violet-400'
                                                                }`}
                                                        >
                                                            {subSection}
                                                            {isSubActive && (
                                                                <span className="absolute -left-[5px] top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-violet-400" />
                                                            )}
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