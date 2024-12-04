/**
 * Преобразует строку времени в формате `'HH:MM:SS'` в количество секунд
 *
 * @param {string} time - Время в формате `'HH:MM:SS'`
 * @returns {number} - Общее количество секунд, соответствующее заданному времени
 *
 * @example
 * // 3600
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
 * @returns {string} - Строка в формате `'X hrs Y mins'`, `'X hrs'`, `'Y mins'` или `'–'`
 *
 * @example
 * // '1 hrs 30 mins'
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
 * // ['WebStorm', 'Rider']
 * getUniqItemsFromStringArr(['WebStorm', 'WebStorm', 'Rider']);
 */
export const getUniqItemsFromStringArr = (arr: string[]): string[] =>
    arr.reduce<string[]>((acc, item) => {
        if (!acc.includes(item)) {
            acc.push(item);
        }

        return acc;
    }, []);

/**
 * Сравнивает два объекта на равенство
 *
 * @param {any} obj - Первый объект для сравнения
 * @param {any} obj2 - Второй объект для сравнения
 * @returns {boolean} - `true`, если объекты равны, иначе `false`
 *
 * @example
 * // true
 * isObjectsEqual({ a: 1, b: 2 }, { a: 1, b: 2 });
 *
 * @example
 * // false
 * isObjectsEqual({ a: 1, b: 2 }, { a: 1, b: 3 });
 */
export const isObjectsEqual = (obj: any, obj2: any): boolean => {
    if (obj === obj2) {
        return true;
    }

    for (let propName in obj) {
        if (obj.hasOwnProperty(propName) !== obj2.hasOwnProperty(propName)) {
            return false;
        } else if (typeof obj[propName] !== typeof obj2[propName]) {
            return false;
        }
    }

    for (let propName in obj2) {
        if (obj.hasOwnProperty(propName) !== obj2.hasOwnProperty(propName)) {
            return false;
        } else if (typeof obj[propName] !== typeof obj2[propName]) {
            return false;
        }

        if (!obj.hasOwnProperty(propName)) {
            continue;
        }

        if (obj[propName] !== obj2[propName]) {
            return false;
        }
    }

    return true;
};

/**
 * Сравнивает два массива на равенство
 *
 * @param {Array<any>} arr - Первый массив для сравнения
 * @param {Array<any>} arr2 - Второй массив для сравнения
 * @returns {boolean} - `true`, если массивы равны, иначе `false`
 *
 * @example
 * // true
 * isArraysEqual([1, 2, 3], [1, 2, 3]);
 *
 * @example
 * // true
 * isArraysEqual([1, 2, 3], [3, 2, 1]);
 *
 * @example
 * // false
 * isArraysEqual([1, 2, 3], [1, 2]);
 *
 * @example
 * // true
 * isArraysEqual([1, 2], [1, 2, 3]);
 */
export const isArraysEqual = (arr: Array<any>, arr2: Array<any>): boolean => {
    if (!arr || !arr2) {
        return false;
    }

    if (arr === arr2) {
        return true;
    }

    if (arr.length !== arr2.length) {
        return false;
    }

    return (
        arr.every((item) => arr2.includes(item)) ||
        arr.every((item) =>
            Boolean(
                arr2.find((item2) => {
                    return isObjectsEqual(item, item2);
                }),
            ),
        )
    );
};

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
