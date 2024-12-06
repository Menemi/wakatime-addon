import styles from './Leaderboard.module.css';

import React, { useEffect, useState } from 'react';
import { useAsync } from 'react-use-custom-hooks';
import axios from 'axios';
import { cn, getUniqItemsFromStringArr, isArraysEqual, numberToStringTime, timeToNumber } from '../../helpers';
import { useNotification } from '../Notification/NotificationProvider';
import Dropdown from '../Dropdown/Dropdown';
import _, { set, values } from 'lodash';

type LeaderboardProps = {
    tableCode: string;
    onMembersChange: (members: number) => void;
    onTimeChange: (time: number) => void;
    onLoad: (data: LeaderboardRow[]) => void;
    onError: (message: string) => void;
};

export type LeaderboardRow = {
    number: number;
    username: string;
    currentWeekCodeTime: number;
    language: string;
    ide: string;
    avgDayCodeTime: number;
    mainProject: string;
    isCodingNow: boolean;
};

type SelectedFilters = {
    codingNow: string[];
    languages: string[];
};

const Leaderboard: React.FC<LeaderboardProps> = ({ tableCode, onMembersChange, onTimeChange, onLoad, onError }) => {
    const [data, setData] = useState<LeaderboardRow[]>([]);
    const [filteredData, setFilteredData] = useState<LeaderboardRow[]>(data);
    const [searchText, setSearchText] = useState('');
    const [debouncedSearchText, setDebouncedSearchText] = useState(searchText);
    const [dropdownData, setDropdownData] = useState<string[]>([]);
    const [defaultSelectedFilters, setDefaultSelectedFilters] = useState<SelectedFilters>({
        codingNow: ['online', 'offline'],
        languages: [],
    });
    const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>(defaultSelectedFilters);

    const { showNotification } = useNotification();

    const csvUrl = `https://docs.google.com/spreadsheets/d/e/${tableCode}/pub?gid=0&single=true&output=csv`;

    const isObjectsEqual = (a: Object, b: Object) => {
        return _.isEqual(a, b);
    };

    const parseData = (input: string): LeaderboardRow[] => {
        const rows = input.trim().split('\n');
        return rows.slice(1).map((row) => {
            const values = row.split(',');

            return {
                number: +values[0],
                username: values[1],
                currentWeekCodeTime: timeToNumber(values[2]),
                language: values[3] || '–',
                ide: values[4].toLowerCase().includes('rider') ? 'Rider' : values[4],
                avgDayCodeTime: timeToNumber(values[5]),
                mainProject: values[6] || '–',
                isCodingNow: values[7].includes('✅'),
            };
        }, {});
    };

    const filterData = (rawData: LeaderboardRow[]) => {
        if (isObjectsEqual(selectedFilters, defaultSelectedFilters)) {
            return rawData;
        }

        return rawData.reduce<LeaderboardRow[]>((acc, item) => {
            const flag =
                selectedFilters.codingNow.length > 0
                    ? selectedFilters.codingNow?.includes(item.isCodingNow ? 'online' : 'offline')
                    : true;
            if (
                (selectedFilters.languages?.includes(item.ide) || selectedFilters.languages?.includes(item.language)) &&
                flag
            ) {
                acc.push(item);
            }

            return acc;
        }, []);
    };

    const handleChangeFilters = (filters: string[], column: 'project' | 'codingNow') => {
        setSelectedFilters((q) => ({
            codingNow: column === 'codingNow' ? filters : q.codingNow,
            languages: column === 'codingNow' ? q.languages : filters,
        }));
    };

    const [rawData, isLoading, error, load] = useAsync(
        () => axios.get(csvUrl).then((response) => response.data),
        {},
        [],
    );

    useEffect(() => {
        const intervalId = setInterval(() => {
            load();
        }, 30000);

        return () => clearInterval(intervalId);
    }, [load]);

    useEffect(() => {
        if (!isLoading && !error) {
            const parsedData = parseData(rawData);

            if (!isArraysEqual(data, parsedData)) {
                setData(parsedData);
                setFilteredData(parsedData.filter((item) =>
                    item.username.toLowerCase().includes(debouncedSearchText.toLowerCase()),
                ));
                onLoad(parsedData);
                onMembersChange(parsedData.length);

                let totalTime = 0;

                parsedData.forEach((row) => {
                    totalTime += row.currentWeekCodeTime;
                });

                onTimeChange(totalTime);
            }

            const newDropdownData = getUniqItemsFromStringArr(parsedData.map((item) => item.language));
            if (!isArraysEqual(dropdownData, newDropdownData)) {
                setDropdownData(newDropdownData);
            }
        }
    }, [isLoading, error]);

    useEffect(() => {
        if (error) {
            onError(error.message);

            showNotification({
                title: 'Ошибка при получении данных',
                message: error.message,
                type: 'error',
                hasAcceptBtn: true,
                onCloseMs: 7000,
            });
        }
    }, [error]);

    useEffect(() => {
        setDefaultSelectedFilters({
            codingNow: ['online', 'offline'],
            languages: getUniqItemsFromStringArr(data.map((item) => item.language)),
        });
    }, [data]);

    useEffect(() => {
        const newFilteredData = data.length === 0 ? data : filterData(data);
        if (!isArraysEqual(filteredData, newFilteredData)) {
            setFilteredData(newFilteredData);
        }
    }, [selectedFilters]);

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedSearchText(searchText), 1500);
        return () => clearTimeout(timer);
    }, [searchText]);

    useEffect(() => {
        const newFilteredData =
            debouncedSearchText === ''
                ? data.length === 0
                    ? data
                    : filterData(data)
                : filteredData.filter((item) =>
                      item.username.toLowerCase().includes(debouncedSearchText.toLowerCase()),
                  );

        setFilteredData(newFilteredData);
    }, [debouncedSearchText]);

    const skeletonRowsNumber = Math.floor(window.innerHeight / 50) - 4;

    const skeleton = Array.from({ length: skeletonRowsNumber }).map((_, key) => (
        <tr key={key} className={styles.skeletonRow}>
            {Array.from({ length: 6 }).map((__, idx) => (
                <td key={idx} className={styles.skeletonCell}>
                    <div className={styles.skeletonData}></div>
                </td>
            ))}
        </tr>
    ));

    const errorSkeleton = (
        <div className={styles.errorContainer}>
            <i className="bx bxs-error-circle bx-lg" style={{ color: 'var(--error-text)' }} />
            <h3 className={styles.errorText}>Ой-ой, похоже произошла ошибочка</h3>
            <p className={styles.errorText}>Приходите позже или попробуйте перезагрузить страницу</p>
            <button onClick={() => window.location.reload()} className={styles.refreshButton}>
                Обновить
            </button>
        </div>
    );

    const table = filteredData.map((row: LeaderboardRow, key: number) => (
        <tr key={key} className={styles.row}>
            <td className={styles.cell}>{key + 1}</td>
            <td className={styles.cell}>{row.username}</td>
            <td className={styles.cell}>{numberToStringTime(row.currentWeekCodeTime)}</td>
            <td className={styles.cell}>{numberToStringTime(row.avgDayCodeTime)}</td>
            <td className={styles.cell}>
                {!row.mainProject || !row.ide || !row.avgDayCodeTime ? (
                    <>–</>
                ) : (
                    <div className={styles.project}>
                        <div className={styles.highlight}>{row.mainProject}</div>
                        <div>
                            [{row.ide} – {row.language}]
                        </div>
                    </div>
                )}
            </td>
            <td className={styles.cell}>
                {row.isCodingNow ? (
                    <i className="bx bx-check bx-md" style={{ color: '#33a151' }} />
                ) : (
                    <i className="bx bx-x bx-md" style={{ color: '#e04135' }} />
                )}
            </td>
        </tr>
    ));

    return (
        <div id="leaderboard" className={styles.container}>
            <div className={styles.titleContainer}>
                <h2 className={styles.title}>Текущая неделя</h2>
            </div>
            <div className={cn([styles.tableContainer, error ? styles.error : null])}>
                {error ? (
                    errorSkeleton
                ) : (
                    <table className={styles.table}>
                        <thead className={styles.tableHead}>
                            <tr className={styles.row}>
                                <td className={styles.cell}>Rank</td>
                                <td className={styles.cell}>
                                    <input
                                        type="text"
                                        onChange={({ target: { value } }) => setSearchText(value)}
                                        placeholder="Username"
                                        className={styles.usernameInput}
                                    />
                                </td>
                                <td className={styles.cell}>Hours Coded</td>
                                <td className={styles.cell}>Daily Average</td>
                                <td className={styles.cell}>
                                    {data.length !== 0 ? (
                                        <Dropdown
                                            data={dropdownData}
                                            onFiltersChange={(filters) => handleChangeFilters(filters, 'project')}
                                        >
                                            <div className={styles.modifiedCell}>
                                                <>Project</>
                                                <i className="bx bx-filter-alt bx-sm" />
                                            </div>
                                        </Dropdown>
                                    ) : (
                                        <>Project</>
                                    )}
                                </td>
                                <td className={styles.cell}>
                                    {data.length !== 0 ? (
                                        <Dropdown
                                            data={['online', 'offline']}
                                            onFiltersChange={(filters) => handleChangeFilters(filters, 'codingNow')}
                                            selectType="radio"
                                        >
                                            <div className={styles.modifiedCell}>
                                                <>Coding Now</>
                                                <i className="bx bx-filter-alt bx-sm" />
                                            </div>
                                        </Dropdown>
                                    ) : (
                                        <>Coding Now</>
                                    )}
                                </td>
                            </tr>
                        </thead>
                        <tbody className={styles.tableBody}>{isLoading && data.length === 0 ? skeleton : table}</tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default Leaderboard;
