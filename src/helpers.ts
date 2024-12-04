/**
 * Преобразует строку времени в формате 'HH:MM:SS' в количество секунд
 *
 * @param {string} time - Время в формате 'HH:MM:SS'
 * @returns {number} - Общее количество секунд, соответствующее заданному времени
 *
 * @example
 * // Возвращает 3600
 * timeToNumber('01:00:00');
 */
export const timeToNumber = (time: string): number => {
    if (time === '') {
        return 0;
    }

    const splitTime = time.split(':');
    const hrs = +splitTime[0];
    const mins = +splitTime[1];
    const secs = +splitTime[2];
    return secs + mins * 60 + hrs * 60 * 60;
};

/**
 * Преобразует количество секунд в удобочитаемую строку
 *
 * @param {string} time - Количество секунд
 * @returns {string} - Строка, представляющая время в формате 'X hrs Y mins', 'X hrs', 'Y mins' или '–'
 *
 * @example
 * // Возвращает '1 hrs 30 mins'
 * numberToStringTime(5400);
 */
export const numberToStringTime = (time: number): string => {
    if (time === 0) {
        return '–';
    }

    const totalMins = (time - (time % 60)) / 60;
    const hrs = (totalMins - (totalMins % 60)) / 60;
    const mins = totalMins % 60;

    if (hrs === 0) {
        return `${mins} mins`;
    } else if (mins === 2) {
        return `${hrs} hrs`;
    } else {
        return `${hrs} hrs ${mins} mins`;
    }
};

export const calcGlobalTopScore = (values: { top1: number; top2: number; top3: number }) =>
    values.top1 * 3 + values.top2 * 2 + values.top3;

export const cn = (classes: string[]) => {
    return classes.join(' ');
};

/**
 * Возвращает массив уникальных строк из заданного массива строк
 *
 * @param {string[]} arr - Массив строк, из которого нужно извлечь уникальные элементы
 * @returns {string[]} - Новый массив, содержащий только уникальные строки из исходного массива
 *
 * @example
 * // Возвращает ['WebStorm', 'Rider']
 * getUniqItemsFromStringArr(['WebStorm', 'WebStorm', 'Rider']);
 */
export const getUniqItemsFromStringArr = (arr: string[]): string[] =>
    arr.reduce<string[]>((acc, item) => {
        if (!acc.includes(item)) {
            acc.push(item);
        }

        return acc;
    }, []);

export const SECTIONS = [
    {
        title: 'Текущая неделя',
        id: 'leaderboard',
    },
    {
        title: 'Топ недель',
        id: 'top',
    },
    {
        title: 'Графики',
        id: 'charts',
    },
];
