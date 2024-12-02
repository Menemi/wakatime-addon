import styles from './Leaderboard.module.css';

import React, { useEffect, useState } from 'react';
import { useAsync } from 'react-use-custom-hooks';
import axios from 'axios';
import { cn, numberToStringTime, timeToNumber } from '../../helpers';
import {useNotification} from "../Notification/NotificationProvider";

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

const Leaderboard: React.FC<LeaderboardProps> = ({ tableCode, onMembersChange, onTimeChange, onLoad, onError }) => {
    const [data, setData] = useState<LeaderboardRow[]>([]);
    const [totalTime, setTotalTime] = useState(0);

    const { showNotification } = useNotification();

    const csvUrl = `https://docs.google.com/spreadsheets/d/e/${tableCode}/pub?gid=0&single=true&output=csv`;

    const parseData = (input: string) => {
        const rows = input.trim().split('\n');
        return rows.slice(1).map((row) => {
            const values = row.split(',');

            return {
                number: +values[0],
                username: values[1],
                currentWeekCodeTime: timeToNumber(values[2]),
                language: values[3],
                ide: values[4],
                avgDayCodeTime: timeToNumber(values[5]),
                mainProject: values[6],
                isCodingNow: values[7].includes('✅'),
            };
        }, {});
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
        if (!isLoading && !error && data.length === 0) {
            const parsedData = parseData(rawData);

            setData(parsedData);
            onLoad(parsedData);
            onMembersChange(parsedData.length);
        }
    }, [isLoading, error]);

    useEffect(() => {
        if (!isLoading && !error && totalTime === 0) {
            data.forEach((row) => {
                setTotalTime((q) => q + row.currentWeekCodeTime);
                onTimeChange(row.currentWeekCodeTime);
            });
        }
    }, [isLoading, error, data]);

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

    const table = data.map((row: LeaderboardRow, key: number) => (
        <tr key={key} className={styles.row}>
            <td className={styles.cell}>{row.number}</td>
            <td className={styles.cell}>{row.username}</td>
            <td className={styles.cell}>{numberToStringTime(row.currentWeekCodeTime)}</td>
            <td className={styles.cell}>{numberToStringTime(row.avgDayCodeTime)}</td>
            <td className={styles.cell}>
                {!row.mainProject || !row.ide || !row.avgDayCodeTime ? (
                    <>–</>
                ) : (
                    <div className={styles.project}>
                        <div className={styles.blackHighlight}>{row.mainProject}</div>
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
                                <td className={styles.cell}>Username</td>
                                <td className={styles.cell}>Hours Coded</td>
                                <td className={styles.cell}>Daily Average</td>
                                <td className={styles.cell}>Project</td>
                                <td className={styles.cell}>Coding Now</td>
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
