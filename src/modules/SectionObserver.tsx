import React from 'react';

type SectionObserverProps = {
    sections: string[];
    setActiveSection: (sectionId: string) => void;
}

const SectionObserver: React.FC<SectionObserverProps> = ({sections, setActiveSection}) => {
    React.useEffect(() => {
        const sectionElements = sections.map((id) =>
            document.getElementById(id)
        );

        const observer = new IntersectionObserver(
            (entries) => {
                const visibleSection = entries.find((entry) => entry.isIntersecting);
                if (visibleSection) {
                    setActiveSection(visibleSection.target.id);
                }
            },
            {rootMargin: '-128px 0px 0px 0px', threshold: 0.6}
        );

        sectionElements.forEach((element) => {
            if (element) {
                observer.observe(element);
            }
        });

        return () => {
            sectionElements.forEach((element) => {
                if (element) {
                    observer.unobserve(element);
                }
            });
        };
    }, [sections, setActiveSection]);

    return null;
}

export default SectionObserver;
