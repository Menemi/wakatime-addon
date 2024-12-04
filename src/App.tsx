import styles from './App.module.css';

import Leaderboard, { LeaderboardRow } from './modules/Leaderboard/Leaderboard';
import React, { useEffect, useState } from 'react';
import SectionObserver from './modules/SectionObserver';
import GlobalTop from './modules/GlobalTop/GlobalTop';
import { cn, numberToStringTime, SECTIONS } from './helpers';
import { useNotification } from './modules/Notification/NotificationProvider';
import moment from 'moment';
import Charts from './modules/Charts/Charts';
import { useTheme } from './modules/Theme/ThemeProvider';

export type ChartsData = {
    username: string;
    totalCodingTimeMins: number;
    language: string;
    ide: string;
    mainProject: string;
    isCodingNow: boolean;
};

const App = () => {
    const [members, setMembers] = useState(0);
    const [totalTime, setTotalTime] = useState(0);
    const [activeSection, setActiveSection] = useState('');
    const [chartsData, setChartsData] = useState<ChartsData[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>();
    const { theme, toggleTheme } = useTheme();

    const { showNotification } = useNotification();

    useEffect(() => {
        const handleResize = () => {
            const newWidth = window.innerWidth;
            if (newWidth <= 550) {
                showNotification({
                    title: 'Размер экрана',
                    message:
                        'Для получения полноценного удовольствия от данного веб-ресурса рекомендую использовать ' +
                        'ноутбук / ПК, ну или хотя бы перевернуть телефон в горизонтальное положение',
                    type: 'warning',
                    hasAcceptBtn: true,
                    onCloseMs: 7000,
                });
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const getTotalTime = () => {
        const today = new Date();
        const dayOfWeek = today.getDay();
        const diffToMonday = (dayOfWeek === 0 ? -6 : 1) - dayOfWeek;

        const weekStart = new Date(today);
        weekStart.setDate(today.getDate() + diffToMonday);
        weekStart.setHours(0, 0, 0, 0);

        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);
        weekEnd.setHours(23, 59, 59, 999);

        return (
            <>
                {members === 0 ? (
                    <div className={cn([styles.skeletonTotalTime, styles.skeleton])}></div>
                ) : (
                    <div className={styles.highLight}>{numberToStringTime(totalTime)}</div>
                )}
                <>in</>
                <div className={styles.blueHighLight}>
                    {moment(weekStart).format('DD.MM.YYYY')} – {moment(weekEnd).format('DD.MM.YYYY')}
                </div>
            </>
        );
    };

    const handleLoadData = (rawData: LeaderboardRow[]) =>
        setChartsData(
            rawData.reduce<ChartsData[]>((acc, item) => {
                if (item.currentWeekCodeTime !== 0) {
                    acc.push({
                        username: item.username,
                        totalCodingTimeMins: (item.currentWeekCodeTime - (item.currentWeekCodeTime % 60)) / 60,
                        language: item.language,
                        ide: item.ide,
                        mainProject: item.mainProject,
                        isCodingNow: item.isCodingNow,
                    });
                }

                return acc;
            }, []),
        );

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.headerMainInfo}>
                    <div className={styles.titleContainer}>
                        <h1 className={cn([styles.title, styles.highLight])}>ITMO Team</h1>
                        {members === 0 ? (
                            <div className={cn([styles.skeletonMembers, styles.skeleton])}></div>
                        ) : (
                            <div className={cn([styles.members, styles.blueHighLight])}>{members} members</div>
                        )}
                    </div>
                    <div className={styles.totalTime}>{getTotalTime()}</div>
                </div>
                <div className={styles.headerRightPart}>
                    <div className={styles.headerButtonsContainer}>
                        {SECTIONS.map((section) => (
                            <a
                                key={section.id}
                                href={`#${section.id}`}
                                className={activeSection === section.id ? styles.activeButton : styles.button}
                            >
                                {section.title}
                            </a>
                        ))}
                    </div>
                    <div onClick={toggleTheme} className={styles.themeBtn}>
                        {window.innerWidth > 450 ? (
                            theme === 'light' ? (
                                <i className="bx bx-moon bx-md" />
                            ) : (
                                <i className="bx bx-sun bx-md" />
                            )
                        ) : theme === 'light' ? (
                            <i className="bx bx-moon bx-sm" />
                        ) : (
                            <i className="bx bx-sun bx-sm" />
                        )}
                    </div>
                </div>
            </header>
            <Leaderboard
                tableCode="2PACX-1vTkWoLikMzDn43FXNi_yS73ReU3Ay_RT1ue4N69X1omhlECHWqas20aGHCzGQ1T9bw4FTG2W975pbRP"
                onMembersChange={(count) => setMembers(count)}
                onTimeChange={(time: number) => setTotalTime(time)}
                onLoad={handleLoadData}
                onError={(message: string) => setErrorMessage(message)}
            />
            <GlobalTop tableCode="2PACX-1vSBOyyJfO0qXuA8WIxiQsDD5wVib2NT7U2RwrvV8dv26OZKKBn5ZJyS-VT3f-f_ekb3JtcxgdAA3Thb" />
            <Charts data={chartsData} error={errorMessage} theme={theme} />
            <SectionObserver sections={SECTIONS.map((section) => section.id)} setActiveSection={setActiveSection} />
        </div>
    );
};

export default App;
