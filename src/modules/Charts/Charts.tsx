import styles from './Charts.module.css';

import React from 'react';
import DoughnutChart from './DoughnutChart';
import {ChartsData} from '../../App';
import BubbleChart from './BubbleChart';

type ChartsProps = {
    isLoading: boolean,
    error?: string,
    data: ChartsData[],
};

const Charts: React.FC<ChartsProps> = ({isLoading, error, data}) => {
    const skeleton = <>loading</>;

    const errorSkeleton = <>error</>;

    const chartSize = {
        width: window.innerWidth < 1070
            ? window.innerWidth - 64 - 6
            : window.innerWidth - 64 - 32 - 32 - 6,
        height: window.innerWidth > 1070
            ? window.innerHeight - 128 - 64 - 6
            : window.innerHeight - 128 - 64 - 32 - 32 - 6,
    };

    const charts = <>
        <div className={styles.bubbleChart}>
            <BubbleChart data={data.reverse()} size={chartSize}/>
        </div>
        <div className={styles.simpleChartsContainer}>
            <div className={styles.simpleChart}>
                <DoughnutChart rawData={data.map(item => item.ide)}/>
            </div>
            <div className={styles.simpleChart}>
                <DoughnutChart rawData={data.map(item => item.language)}/>
            </div>
        </div>
    </>;

    return <div id='charts' className={styles.container} style={{height: chartSize.height}}>
        <div className={styles.titleContainer}><h2 className={styles.title}>
            {window.innerWidth <= 800 || window.innerHeight <= 800
                ? 'Графики'
                : 'Графики (посмотри и ниже)'}
        </h2></div>
        <div className={styles.chartsContainer}>
            {isLoading
                ? skeleton
                : error
                    ? errorSkeleton
                    : charts}
        </div>
    </div>;
}

export default Charts;
