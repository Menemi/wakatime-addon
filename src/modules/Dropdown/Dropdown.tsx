import styles from './Dropdown.module.css';

import React, { useEffect, useRef, useState } from 'react';

type SelectType = 'radio' | 'checkbox';

type DropdownProps = {
    data: string[];
    onFiltersChange: (filters: string[]) => void;
    selectType?: SelectType;
};

const Dropdown: React.FC<DropdownProps> = ({ children, data, onFiltersChange, selectType = 'checkbox' }) => {
    const [isVisible, setIsVisible] = useState(false);
    const elementRef = useRef<HTMLDivElement>(null);
    const [selectedFilters, setSelectedFilters] = useState<string[]>(selectType === 'radio' ? [] : data);

    useEffect(() => {
        isVisible
            ? document.addEventListener('mousedown', handleClickOutside)
            : document.removeEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isVisible]);

    const handleClickInside = () => {
        setIsVisible((q) => !q);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (elementRef.current && !elementRef.current.contains(event.target as Node)) {
            setIsVisible(false);
        }
    };

    useEffect(() => {
        if (selectedFilters.length === 0 && selectType !== 'radio') {
            setSelectedFilters(data);
        }
    }, [data]);

    useEffect(() => {
        onFiltersChange(selectedFilters);
    }, [selectedFilters]);

    const handleSelectButtonClick = (item: string) => {
        if (selectType === 'radio') {
            setSelectedFilters([item]);
            return;
        }

        selectedFilters.includes(item)
            ? setSelectedFilters((q) => q.filter((filter) => filter !== item))
            : setSelectedFilters((q) => [...q, item]);
    };

    return (
        <>
            {isVisible && (
                <div ref={elementRef} className={styles.container}>
                    <form className={styles.itemsContainer}>
                        {data.map((item, key) => (
                            <div key={key} onClick={() => handleSelectButtonClick(item)} className={styles.item}>
                                <input
                                    type={selectType}
                                    value={item}
                                    id={item}
                                    checked={selectedFilters.includes(item)}
                                    className={styles.input}
                                    onChange={() => handleSelectButtonClick(item)}
                                />
                                <label className={styles.label}>{item}</label>
                            </div>
                        ))}
                    </form>
                    <button
                        onClick={() => setSelectedFilters(selectType === 'radio' ? [] : data)}
                        className={styles.resetBtn}
                    >
                        {selectType === 'radio' ? 'Сбросить' : 'Выбрать всё'}
                    </button>
                </div>
            )}
            <div onClick={handleClickInside} className={styles.childrenContainer}>
                {children}
            </div>
        </>
    );
};
export default Dropdown;
