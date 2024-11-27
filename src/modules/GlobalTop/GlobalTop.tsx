import styles from './GlobalTop.module.css';

import React, {useEffect, useState} from 'react';
import {useAsync} from 'react-use-custom-hooks';
import axios from 'axios';
import {timeToString} from '../../helpers';

type GlobalTopProps = {
    tableCode: string,
};

type GlobalTopRow = {
    number: string,
    username: string,
    top1: string,
    top2: string,
    top3: string,
    codeTime: string,
    bestWeek: string,
}

const GlobalTop: React.FC<GlobalTopProps> = ({tableCode}) => {
    const [data, setData] = useState<GlobalTopRow[]>([]);

    const csvUrl = `https://docs.google.com/spreadsheets/d/e/${tableCode}/pub?gid=0&single=true&output=csv`;

    const parseData = (input: string) => {
        const rows = input.trim().split('\n');
        return rows.slice(1).map((row) => {
            const values = row.split(',');

            return {
                number: values[0],
                username: values[1],
                top1: values[2],
                top2: values[3],
                top3: values[4],
                codeTime: values[6],
                bestWeek: `${values[7]} – ${values[8]}`,
            }
        }, {});
    };

    const [
        rawData,
        isLoading,
        error,
        load,
    ] = useAsync(() => axios.get(csvUrl).then(response => response.data), {}, []);

    useEffect(() => {
        if (!isLoading && !error && data.length === 0) {
            const parsedData = parseData(rawData);
            setData(parsedData);
        }
    }, [isLoading, error]);

    const skeleton = <>loading</>;

    const errorSkeleton = <>error</>;

    const table = <table className={styles.table}>
        <thead className={styles.tableHead}>
        <tr className={styles.row}>
            <td className={styles.cell}>Rank</td>
            <td className={styles.cell}>Username</td>
            <td className={styles.cell}>Top 1</td>
            <td className={styles.cell}>Top 2</td>
            <td className={styles.cell}>Top 3</td>
            <td className={styles.cell}>Best Week [BW]</td>
            <td className={styles.cell}>BW Code Time</td>
        </tr>
        </thead>
        <tbody className={styles.tableBody}>
        {data.map((row: GlobalTopRow, key: number) => <tr key={key} className={styles.row}>
            <td className={styles.cell}>{row.number}</td>
            <td className={styles.cell}>{row.username}</td>
            <td className={styles.cell}>{row.top1 || '–'}</td>
            <td className={styles.cell}>{row.top2 || '–'}</td>
            <td className={styles.cell}>{row.top3 || '–'}</td>
            <td className={styles.cell}>{row.bestWeek}</td>
            <td className={styles.cell}>
                {row.codeTime
                    ? timeToString(row.codeTime)
                    : <>–</>
                }
            </td>
        </tr>)}
        </tbody>
    </table>;

    return <div id='top' className={styles.container}>
        <div className={styles.titleContainer}><h2 className={styles.title}>Топ недель</h2></div>
        <div className={styles.tableContainer}>
            {isLoading
                ? skeleton
                : error
                    ? errorSkeleton
                    : table}
        </div>
    </div>;
}

export default GlobalTop;
