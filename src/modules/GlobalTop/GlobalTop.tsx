import styles from './GlobalTop.module.css';

import React, { useEffect, useState } from 'react';
import { useAsync } from 'react-use-custom-hooks';
import axios from 'axios';
import { calcGlobalTopScore, cn, numberToStringTime, timeToNumber } from '../../helpers';

type GlobalTopProps = {
    tableCode: string;
};

type GlobalTopRow = {
    number: number;
    username: string;
    top1: number;
    top2: number;
    top3: number;
    score: number;
    codeTime: number;
    bestWeek: string;
};

type SortParam = 'score' | 'codeTime';

type SortDirection = 'desc' | 'asc';

const scoreSortIcons: JSX.Element[] = [
    <i className="bx bx-sort-alt-2 bx-sm" />,
    <i className="bx bx-sort-up bx-sm" />,
    <i className="bx bx-sort-down bx-sm" />,
];

const GlobalTop: React.FC<GlobalTopProps> = ({ tableCode }) => {
    const [data, setData] = useState<GlobalTopRow[]>([]);
    const [filteredData, setFilteredData] = useState<GlobalTopRow[]>(data);
    const [scoreSortIconIndex, setScoreSortIconIndex] = useState(0);
    const [codeTimeSortIconIndex, setCodeTimeSortIconIndex] = useState(0);
    const [sortParam, setSortParam] = useState<SortParam>('score');
    const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
    const [searchText, setSearchText] = useState('');
    const [debouncedSearchText, setDebouncedSearchText] = useState(searchText);

    const csvUrl = `https://docs.google.com/spreadsheets/d/e/${tableCode}/pub?gid=0&single=true&output=csv`;

    const parseData = (input: string): GlobalTopRow[] => {
        const rows = input.trim().split('\n');
        return rows.slice(1).map<GlobalTopRow>((row) => {
            const values = row.split(',');
            const score = calcGlobalTopScore({ top1: +values[2], top2: +values[3], top3: +values[4] });

            return {
                number: +values[0],
                username: values[1],
                top1: +values[2],
                top2: +values[3],
                top3: +values[4],
                score: score,
                codeTime: timeToNumber(values[6]),
                bestWeek: `${values[7]} – ${values[8]}`,
            };
        }, {});
    };

    const sortData = (data: GlobalTopRow[], param: SortParam, direction: SortDirection) => {
        return [...data].sort((a, b) => {
            if (direction === 'asc') {
                return a[param] - b[param];
            } else {
                return b[param] - a[param];
            }
        });
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
            const sortedData = sortData(parsedData, sortParam, sortDirection);
            setData(sortedData);
            setFilteredData(sortedData.filter((item) =>
                item.username.toLowerCase().includes(debouncedSearchText.toLowerCase()),
            ));
        }
    }, [isLoading, error, sortParam, sortDirection]);

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedSearchText(searchText), 1500);
        return () => clearTimeout(timer);
    }, [searchText]);

    useEffect(() => {
        const newFilteredData =
            debouncedSearchText === ''
                ? data
                : data.filter((item) =>
                    item.username.toLowerCase().includes(debouncedSearchText.toLowerCase()),
                );

        setFilteredData(newFilteredData);
    }, [debouncedSearchText]);

    const handleSortButtonClick = (column: SortParam) => {
        if (column === 'score') {
            if (scoreSortIconIndex === 1) {
                setSortDirection('asc');
            } else {
                setSortDirection('desc');
            }

            setScoreSortIconIndex((q) => (q + 1) % 3);
            setCodeTimeSortIconIndex(0);
        } else {
            if (codeTimeSortIconIndex === 1) {
                setSortDirection('asc');
            } else {
                setSortDirection('desc');
            }

            setCodeTimeSortIconIndex((q) => (q + 1) % 3);
            setScoreSortIconIndex(0);
        }
        setSortParam(column);
    };

    const skeletonRowsNumber = Math.floor(window.innerHeight / 50) - 4;

    const skeleton = Array.from({ length: skeletonRowsNumber }).map((_, key) => (
        <tr key={key} className={styles.skeletonRow}>
            {Array.from({ length: 8 }).map((__, idx) => (
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

    const table = filteredData.map((row: GlobalTopRow, key: number) => (
        <tr key={key} className={styles.row}>
            <td className={styles.cell}>{key + 1}</td>
            <td className={styles.cell}>{row.username}</td>
            <td className={styles.cell}>{row.top1 || '–'}</td>
            <td className={styles.cell}>{row.top2 || '–'}</td>
            <td className={styles.cell}>{row.top3 || '–'}</td>
            <td className={styles.cell}>{row.score || 0}</td>
            <td className={styles.cell}>{row.bestWeek}</td>
            <td className={styles.cell}>{row.codeTime ? numberToStringTime(row.codeTime) : <>–</>}</td>
        </tr>
    ));

    return (
        <div id="top" className={styles.container}>
            <div className={styles.titleContainer}>
                <h2 className={styles.title}>Топ недель</h2>
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
                                <td className={styles.cell}>Top 1</td>
                                <td className={styles.cell}>Top 2</td>
                                <td className={styles.cell}>Top 3</td>
                                <td className={styles.cell}>
                                    <div onClick={() => handleSortButtonClick('score')} className={styles.modifiedCell}>
                                        Score {scoreSortIcons[scoreSortIconIndex]}
                                    </div>
                                </td>
                                <td className={styles.cell}>Best Week [BW]</td>
                                <td className={styles.cell}>
                                    <div
                                        onClick={() => handleSortButtonClick('codeTime')}
                                        className={styles.modifiedCell}
                                    >
                                        BW Code Time {scoreSortIcons[codeTimeSortIconIndex]}
                                    </div>
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

export default GlobalTop;
