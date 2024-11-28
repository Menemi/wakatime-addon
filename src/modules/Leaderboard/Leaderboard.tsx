import styles from './Leaderboard.module.css';

import React, { useEffect, useState } from 'react';
import { useAsync } from 'react-use-custom-hooks';
import axios from 'axios';
import { timeToString } from '../../helpers';

type LeaderboardProps = {
    tableCode: string;
    onMembersChange: (members: number) => void;
    onTimeChange: (time: { hours: number; minutes: number; seconds: number }) => void;
    onLoad: (data: LeaderboardRow[]) => void;
};

export type LeaderboardRow = {
    number: string;
    username: string;
    currentWeekCodeTime: string;
    language: string;
    ide: string;
    avgDayCodeTime: string;
    mainProject: string;
    isCodingNow: boolean;
};

const Leaderboard: React.FC<LeaderboardProps> = ({ tableCode, onMembersChange, onTimeChange, onLoad }) => {
    const [data, setData] = useState<LeaderboardRow[]>([]);
    const [totalTime, setTotalTime] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    const csvUrl = `https://docs.google.com/spreadsheets/d/e/${tableCode}/pub?gid=0&single=true&output=csv`;

    const parseData = (input: string) => {
        const rows = input.trim().split('\n');
        return rows.slice(1).map((row) => {
            const values = row.split(',');

            return {
                number: values[0],
                username: values[1],
                currentWeekCodeTime: values[2],
                language: values[3],
                ide: values[4],
                avgDayCodeTime: values[5],
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
        if (!isLoading && !error && data.length === 0) {
            const parsedData = parseData(rawData);

            setData(parsedData);
            onLoad(parsedData);
            onMembersChange(parsedData.length);
        }
    }, [isLoading, error]);

    useEffect(() => {
        if (!isLoading && !error && totalTime.hours === 0 && totalTime.minutes === 0 && totalTime.seconds === 0) {
            data.forEach((row) => {
                const splitTime = row.currentWeekCodeTime.split(':');
                const hrs = +splitTime[0];
                const mins = +splitTime[1];
                const secs = +splitTime[2];

                setTotalTime((curTime) => ({
                    hours: (curTime.hours += hrs),
                    minutes: (curTime.minutes += mins),
                    seconds: (curTime.seconds += secs),
                }));

                onTimeChange({
                    hours: hrs,
                    minutes: mins,
                    seconds: secs,
                });
            });
        }
    }, [isLoading, error, data]);

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

    const errorSkeleton = <>error</>;

    const table = data.map((row: LeaderboardRow, key: number) => (
        <tr key={key} className={styles.row}>
            <td className={styles.cell}>{row.number}</td>
            <td className={styles.cell}>{row.username}</td>
            <td className={styles.cell}>{timeToString(row.currentWeekCodeTime)}</td>
            <td className={styles.cell}>{timeToString(row.avgDayCodeTime)}</td>
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
            <div className={styles.tableContainer}>
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
                    <tbody className={styles.tableBody}>{isLoading ? skeleton : error ? errorSkeleton : table}</tbody>
                </table>
            </div>
        </div>
    );
};

export default Leaderboard;
