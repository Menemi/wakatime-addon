import styles from './OptionsDropdown.module.css';

import React, { useEffect, useState } from 'react';

type OptionsDropdownProps = {
    title: string;
    options: string[];
    onSelectChange: (selectedOptions: string[]) => void;
    selectType?: 'radio' | 'checkbox';
    noEndLine?: true;
};

const OptionsDropdown: React.FC<OptionsDropdownProps> = ({
    title,
    options,
    onSelectChange,
    selectType = 'radio',
    noEndLine = false,
}) => {
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

    useEffect(() => {
        console.log(title, selectedOptions);
    }, [selectedOptions]);

    const handleInputChange = (option: string) => {
        selectType === 'radio'
            ? setSelectedOptions([option])
            : setSelectedOptions((q) => (q.includes(option) ? q.filter((item) => item !== option) : [...q, option]));
    };

    return (
        <div className={styles.container}>
            <h3 className={styles.title}>{title}</h3>
            <form className={styles.optionsContainer}>
                {options.map((item, key) => (
                    <div key={key} className={styles.option}>
                        <input
                            type={selectType}
                            onChange={() => handleInputChange(item)}
                            id={item}
                            checked={selectedOptions.includes(item)}
                        />
                        <label>{item}</label>
                    </div>
                ))}
            </form>
            {!noEndLine && <hr className={styles.hrHorizontalGradient}/>}
        </div>
    );
};
export default OptionsDropdown;
