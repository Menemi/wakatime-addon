import styles from './Charts.module.css';

import React, { useEffect } from 'react';
import DoughnutChart from './DoughnutChart';
import { ChartsData } from '../../App';
import BubbleChart from './BubbleChart';
import Loader from 'react-ts-loaders';
import { useNotification } from '../Notification/NotificationProvider';

type ChartsProps = {
    data: ChartsData[];
    error?: string;
};

const Charts: React.FC<ChartsProps> = ({ data, error }) => {
    const { showNotification } = useNotification();

    const isLoading = data.length === 0;

    const chartSize = {
        width: window.innerWidth < 1070 ? window.innerWidth - 64 - 6 : window.innerWidth - 64 - 32 - 32 - 6,
        height:
            window.innerWidth > 1070 ? window.innerHeight - 128 - 64 - 6 : window.innerHeight - 128 - 64 - 32 - 32 - 6,
    };

    useEffect(() => {
        if (error) {
            showNotification({
                title: 'Ошибка при получении данных',
                message: error,
                type: 'error',
                hasAcceptBtn: true,
                onCloseMs: 7000,
            });
        }
    }, [error]);

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

    return (
        <div id="charts" className={styles.container}>
            <div className={styles.titleContainer}>
                <h2 className={styles.title}>
                    {window.innerWidth <= 800 || window.innerHeight <= 800 || error
                        ? 'Графики'
                        : 'Графики (посмотри и ниже)'}
                </h2>
            </div>
            <div className={styles.chartsContainer} style={{ gap: isLoading ? 48 : 0 }}>
                {error ? (
                    errorSkeleton
                ) : (
                    <>
                        <div className={styles.bubbleChart} style={{ height: chartSize.height }}>
                            {isLoading ? (
                                <Loader type="dotspinner" color="var(--blue)" size={150} />
                            ) : (
                                <BubbleChart data={data.reverse()} size={chartSize} />
                            )}
                        </div>
                        <div className={styles.simpleChartsContainer}>
                            <div className={styles.simpleChart}>
                                {isLoading ? (
                                    <Loader type="dotspinner" color="var(--blue)" size={100} />
                                ) : (
                                    <DoughnutChart rawData={data.map((item) => item.ide)} />
                                )}
                            </div>
                            <div className={styles.simpleChart}>
                                {isLoading ? (
                                    <Loader type="dotspinner" color="var(--blue)" size={100} />
                                ) : (
                                    <DoughnutChart rawData={data.map((item) => item.language)} />
                                )}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Charts;
