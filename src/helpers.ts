export const timeToString = (time: string) => {
    const splitTime = time.split(':');
    if (splitTime[0] === '0' && splitTime[1] === '00') {
        return '–';
    } else if (splitTime[0] === '0') {
        return `${splitTime[1]} mins`;
    } else if (splitTime[1] === '00') {
        return `${splitTime[0]} hrs`;
    } else {
        return `${splitTime[0]} hrs ${splitTime[1]} mins`;
    }
};

export const cn = (classes: string[]) => {
    return classes.join(' ');
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

const ROWS_NUMBER_FROM_DEVICE_HEIGHT: {
    height: number,
    rowsNumber: number,
}[] = [
    {
        height: 1400,
        rowsNumber: 23,
    },
    {
        height: 1180,
        rowsNumber: 18,
    },
    {
        height: 1024,
        rowsNumber: 16,
    },
    {
        height: 958,
        rowsNumber: 15,
    },
    {
        height: 820,
        rowsNumber: 12,
    },

]
// 1400 -> 23
// ... -> ...
// 850 -> 12
// 800 -> 10
// ... -> ...
// 400 -> 5

export const mockData = [
    {
        "number": "1",
        "username": "yaaarslv",
        "currentWeekCodeTime": "34:54:00",
        "language": "Java",
        "ide": "IntelliJ IDEA",
        "avgDayCodeTime": "6:58:47",
        "mainProject": "tratatushki_tratata",
        "isCodingNow": false
    },
    {
        "number": "2",
        "username": "pypka",
        "currentWeekCodeTime": "26:24:00",
        "language": "C#",
        "ide": "Jetbrainsrider",
        "avgDayCodeTime": "5:16:47",
        "mainProject": "cm-subscriber",
        "isCodingNow": true
    },
    {
        "number": "3",
        "username": "kosandron",
        "currentWeekCodeTime": "20:08:00",
        "language": "Python",
        "ide": "PyCharm",
        "avgDayCodeTime": "4:01:33",
        "mainProject": "3-linear-kosandron",
        "isCodingNow": true
    },
    {
        "number": "4",
        "username": "krugarrr",
        "currentWeekCodeTime": "14:15:00",
        "language": "C#",
        "ide": "IntelliJ IDEA",
        "avgDayCodeTime": "2:51:00",
        "mainProject": "tiny-event-sourcing-demo",
        "isCodingNow": true
    },
    {
        "number": "5",
        "username": "Walter Rabbit",
        "currentWeekCodeTime": "13:52:00",
        "language": "C#",
        "ide": "Rider",
        "avgDayCodeTime": "2:46:26",
        "mainProject": "ugmk",
        "isCodingNow": false
    },
    {
        "number": "6",
        "username": "Menemi",
        "currentWeekCodeTime": "12:41:00",
        "language": "TypeScript",
        "ide": "WebStorm",
        "avgDayCodeTime": "2:32:09",
        "mainProject": "wakatime-extension",
        "isCodingNow": true
    },
    {
        "number": "7",
        "username": "nastya",
        "currentWeekCodeTime": "12:05:00",
        "language": "TypeScript",
        "ide": "WebStorm",
        "avgDayCodeTime": "2:24:57",
        "mainProject": "QL_Front",
        "isCodingNow": false
    },
    {
        "number": "8",
        "username": "eeeedgar",
        "currentWeekCodeTime": "9:36:00",
        "language": "Dart",
        "ide": "VS Code",
        "avgDayCodeTime": "1:55:11",
        "mainProject": "adguard-mail",
        "isCodingNow": false
    },
    {
        "number": "9",
        "username": "Suren",
        "currentWeekCodeTime": "7:57:00",
        "language": "C#",
        "ide": "Rider",
        "avgDayCodeTime": "1:35:24",
        "mainProject": "apr.backend",
        "isCodingNow": false
    },
    {
        "number": "10",
        "username": "dnbyyyy",
        "currentWeekCodeTime": "7:15:00",
        "language": "YAML",
        "ide": "IntelliJ IDEA",
        "avgDayCodeTime": "1:26:59",
        "mainProject": "ufr-proshell-clm-api",
        "isCodingNow": false
    },
    {
        "number": "11",
        "username": "Vlad Baza",
        "currentWeekCodeTime": "6:58:00",
        "language": "C#",
        "ide": "Jetbrainsrider",
        "avgDayCodeTime": "1:23:38",
        "mainProject": "Integrations",
        "isCodingNow": false
    },
    {
        "number": "12",
        "username": "kr1sps",
        "currentWeekCodeTime": "6:51:00",
        "language": "C#",
        "ide": "Jetbrainsrider",
        "avgDayCodeTime": "1:22:11",
        "mainProject": "pickerup",
        "isCodingNow": false
    },
    {
        "number": "13",
        "username": "Blayzzand",
        "currentWeekCodeTime": "4:50:00",
        "language": "CSS",
        "ide": "WebStorm",
        "avgDayCodeTime": "0:57:57",
        "mainProject": "hw",
        "isCodingNow": false
    },
    {
        "number": "14",
        "username": "dubs7ep",
        "currentWeekCodeTime": "4:19:00",
        "language": "C#",
        "ide": "PyCharm",
        "avgDayCodeTime": "0:51:50",
        "mainProject": "3-linear-att4ano",
        "isCodingNow": false
    },
    {
        "number": "15",
        "username": "iwshel",
        "currentWeekCodeTime": "3:01:00",
        "language": "Python",
        "ide": "PyCharm",
        "avgDayCodeTime": "0:36:14",
        "mainProject": "iwshel",
        "isCodingNow": false
    },
    {
        "number": "16",
        "username": "n1nt3nd0",
        "currentWeekCodeTime": "1:51:00",
        "language": "JavaScript",
        "ide": "WebStorm",
        "avgDayCodeTime": "0:22:11",
        "mainProject": "is-web-y26",
        "isCodingNow": false
    },
    {
        "number": "17",
        "username": "SunLY",
        "currentWeekCodeTime": "0:29:00",
        "language": "C#",
        "ide": "Jetbrainsrider",
        "avgDayCodeTime": "0:05:45",
        "mainProject": "QL_Back",
        "isCodingNow": false
    },
    {
        "number": "18",
        "username": "Iamnotagenius",
        "currentWeekCodeTime": "0:19:00",
        "language": "sshconfig",
        "ide": "Neovim",
        "avgDayCodeTime": "0:03:50",
        "mainProject": "Unknown Project",
        "isCodingNow": false
    },
    {
        "number": "19",
        "username": "PchyolkaZloy",
        "currentWeekCodeTime": "0:11:00",
        "language": "protobuf",
        "ide": "Jetbrainsrider",
        "avgDayCodeTime": "0:02:09",
        "mainProject": "PchyolkaZloy",
        "isCodingNow": false
    },
    {
        "number": "20",
        "username": "Fleack",
        "currentWeekCodeTime": "0:00:00",
        "language": "",
        "ide": "",
        "avgDayCodeTime": "0:00:00",
        "mainProject": "",
        "isCodingNow": false
    },
    {
        "number": "21",
        "username": "se7go",
        "currentWeekCodeTime": "0:00:00",
        "language": "",
        "ide": "",
        "avgDayCodeTime": "0:00:00",
        "mainProject": "",
        "isCodingNow": false
    },
    {
        "number": "22",
        "username": ".&blueblood",
        "currentWeekCodeTime": "0:00:00",
        "language": "",
        "ide": "",
        "avgDayCodeTime": "0:00:00",
        "mainProject": "",
        "isCodingNow": false
    },
    {
        "number": "23",
        "username": "I_SER_I",
        "currentWeekCodeTime": "0:00:00",
        "language": "",
        "ide": "",
        "avgDayCodeTime": "0:00:00",
        "mainProject": "",
        "isCodingNow": false
    },
    {
        "number": "24",
        "username": "lewinup",
        "currentWeekCodeTime": "0:00:00",
        "language": "",
        "ide": "",
        "avgDayCodeTime": "0:00:00",
        "mainProject": "",
        "isCodingNow": false
    },
    {
        "number": "25",
        "username": "nech9ev",
        "currentWeekCodeTime": "0:00:00",
        "language": "",
        "ide": "",
        "avgDayCodeTime": "0:00:00",
        "mainProject": "",
        "isCodingNow": false
    },
    {
        "number": "26",
        "username": "Eminbegin",
        "currentWeekCodeTime": "0:00:00",
        "language": "",
        "ide": "",
        "avgDayCodeTime": "0:00:00",
        "mainProject": "",
        "isCodingNow": false
    },
    {
        "number": "27",
        "username": "Dforgeek",
        "currentWeekCodeTime": "0:00:00",
        "language": "",
        "ide": "",
        "avgDayCodeTime": "0:00:00",
        "mainProject": "",
        "isCodingNow": false
    },
    {
        "number": "28",
        "username": "Sayron",
        "currentWeekCodeTime": "0:00:00",
        "language": "",
        "ide": "",
        "avgDayCodeTime": "0:00:00",
        "mainProject": "",
        "isCodingNow": false
    },
    {
        "number": "29",
        "username": "bitbox",
        "currentWeekCodeTime": "0:00:00",
        "language": "",
        "ide": "",
        "avgDayCodeTime": "0:00:00",
        "mainProject": "",
        "isCodingNow": false
    },
    {
        "number": "30",
        "username": "volkaris (Ilya)",
        "currentWeekCodeTime": "0:00:00",
        "language": "",
        "ide": "",
        "avgDayCodeTime": "0:00:00",
        "mainProject": "",
        "isCodingNow": false
    },
    {
        "number": "31",
        "username": "флэшдроппп",
        "currentWeekCodeTime": "0:00:00",
        "language": "",
        "ide": "",
        "avgDayCodeTime": "0:00:00",
        "mainProject": "",
        "isCodingNow": false
    },
    {
        "number": "32",
        "username": "Vaniog",
        "currentWeekCodeTime": "0:00:00",
        "language": "",
        "ide": "",
        "avgDayCodeTime": "0:00:00",
        "mainProject": "",
        "isCodingNow": false
    },
    {
        "number": "33",
        "username": "notoriginallink",
        "currentWeekCodeTime": "0:00:00",
        "language": "",
        "ide": "",
        "avgDayCodeTime": "0:00:00",
        "mainProject": "",
        "isCodingNow": false
    },
    {
        "number": "34",
        "username": "MaksOn",
        "currentWeekCodeTime": "0:00:00",
        "language": "",
        "ide": "",
        "avgDayCodeTime": "0:00:00",
        "mainProject": "",
        "isCodingNow": false
    },
    {
        "number": "35",
        "username": "Pashs.ba",
        "currentWeekCodeTime": "0:00:00",
        "language": "",
        "ide": "",
        "avgDayCodeTime": "0:00:00",
        "mainProject": "",
        "isCodingNow": false
    },
    {
        "number": "36",
        "username": "KKhasan",
        "currentWeekCodeTime": "0:00:00",
        "language": "",
        "ide": "",
        "avgDayCodeTime": "0:00:00",
        "mainProject": "",
        "isCodingNow": false
    },
    {
        "number": "37",
        "username": "GoLDen",
        "currentWeekCodeTime": "0:00:00",
        "language": "",
        "ide": "",
        "avgDayCodeTime": "0:00:00",
        "mainProject": "",
        "isCodingNow": false
    },
    {
        "number": "38",
        "username": "FeToR",
        "currentWeekCodeTime": "0:00:00",
        "language": "",
        "ide": "",
        "avgDayCodeTime": "0:00:00",
        "mainProject": "",
        "isCodingNow": false
    },
    {
        "number": "39",
        "username": "grumbletumbles",
        "currentWeekCodeTime": "0:00:00",
        "language": "",
        "ide": "",
        "avgDayCodeTime": "0:00:00",
        "mainProject": "",
        "isCodingNow": false
    },
    {
        "number": "40",
        "username": "AlexVashchenkov",
        "currentWeekCodeTime": "0:00:00",
        "language": "",
        "ide": "",
        "avgDayCodeTime": "0:00:00",
        "mainProject": "",
        "isCodingNow": false
    },
    {
        "number": "41",
        "username": "DoKep",
        "currentWeekCodeTime": "0:00:00",
        "language": "",
        "ide": "",
        "avgDayCodeTime": "0:00:00",
        "mainProject": "",
        "isCodingNow": false
    },
    {
        "number": "42",
        "username": "Ldrgv",
        "currentWeekCodeTime": "0:00:00",
        "language": "",
        "ide": "",
        "avgDayCodeTime": "0:00:00",
        "mainProject": "",
        "isCodingNow": false
    },
    {
        "number": "43",
        "username": "rurkkk",
        "currentWeekCodeTime": "0:00:00",
        "language": "",
        "ide": "",
        "avgDayCodeTime": "0:00:00",
        "mainProject": "",
        "isCodingNow": false
    },
    {
        "number": "44",
        "username": "IgorM27",
        "currentWeekCodeTime": "0:00:00",
        "language": "",
        "ide": "",
        "avgDayCodeTime": "0:00:00",
        "mainProject": "",
        "isCodingNow": false
    },
    {
        "number": "45",
        "username": "blesssad",
        "currentWeekCodeTime": "0:00:00",
        "language": "",
        "ide": "",
        "avgDayCodeTime": "0:00:00",
        "mainProject": "",
        "isCodingNow": false
    },
    {
        "number": "46",
        "username": "mityaiii",
        "currentWeekCodeTime": "0:00:00",
        "language": "",
        "ide": "",
        "avgDayCodeTime": "0:00:00",
        "mainProject": "",
        "isCodingNow": false
    }
];

export const mockData2 = [
    {
        "number": "1",
        "username": "Iamnotagenius",
        "top1": "21",
        "top2": "1",
        "top3": "5",
        "codeTime": "20:25:00",
        "bestWeek": "30.09.2024 – 06.10.2024\r"
    },
    {
        "number": "2",
        "username": "yaaarslv",
        "top1": "12",
        "top2": "3",
        "top3": "1",
        "codeTime": "40:12:00",
        "bestWeek": "04.11.2024 – 10.11.2024\r"
    },
    {
        "number": "3",
        "username": "nech9ev",
        "top1": "6",
        "top2": "6",
        "top3": "2",
        "codeTime": "55:38:00",
        "bestWeek": "10.04.2023 – 16.04.2023\r"
    },
    {
        "number": "4",
        "username": "lewinup",
        "top1": "2",
        "top2": "7",
        "top3": "4",
        "codeTime": "35:19:00",
        "bestWeek": "24.07.2023 – 30.07.2023\r"
    },
    {
        "number": "5",
        "username": "eeeedgar",
        "top1": "1",
        "top2": "6",
        "top3": "4",
        "codeTime": "28:13:00",
        "bestWeek": "12.08.2024 – 18.08.2024\r"
    },
    {
        "number": "6",
        "username": "nastya",
        "top1": "5",
        "top2": "1",
        "top3": "2",
        "codeTime": "40:59:00",
        "bestWeek": "08.07.2024 – 14.07.2024\r"
    },
    {
        "number": "7",
        "username": "pypka",
        "top1": "1",
        "top2": "5",
        "top3": "2",
        "codeTime": "28:33:00",
        "bestWeek": "28.10.2024 – 03.11.2024\r"
    },
    {
        "number": "8",
        "username": "Walter Rabbit",
        "top1": "",
        "top2": "2",
        "top3": "5",
        "codeTime": "28:38:00",
        "bestWeek": "28.10.2024 – 03.11.2024\r"
    },
    {
        "number": "9",
        "username": "Dforgeek",
        "top1": "1",
        "top2": "1",
        "top3": "4",
        "codeTime": "0:52:00",
        "bestWeek": "15.07.2024 – 21.07.2024\r"
    },
    {
        "number": "10",
        "username": "krugarrr",
        "top1": "1",
        "top2": "2",
        "top3": "3",
        "codeTime": "35:08:00",
        "bestWeek": "11.11.2024 – 17.11.2024\r"
    },
    {
        "number": "11",
        "username": "dubs7ep",
        "top1": "2",
        "top2": "2",
        "top3": "1",
        "codeTime": "36:59:00",
        "bestWeek": "29.07.2024 – 04.08.2024\r"
    },
    {
        "number": "12",
        "username": "FeToR",
        "top1": "2",
        "top2": "",
        "top3": "3",
        "codeTime": "31:26:00",
        "bestWeek": "02.10.2023 – 08.10.2023\r"
    },
    {
        "number": "13",
        "username": "se7go",
        "top1": "",
        "top2": "3",
        "top3": "2",
        "codeTime": "35:30:00",
        "bestWeek": "08.04.2024 – 14.04.2024\r"
    },
    {
        "number": "14",
        "username": "Vaniog",
        "top1": "",
        "top2": "3",
        "top3": "2",
        "codeTime": "35:48:00",
        "bestWeek": "13.05.2024 – 19.05.2024\r"
    },
    {
        "number": "15",
        "username": "Eminbegin",
        "top1": "",
        "top2": "3",
        "top3": "1",
        "codeTime": "15:58:00",
        "bestWeek": "24.06.2024 – 30.06.2024\r"
    },
    {
        "number": "16",
        "username": "MaksOn",
        "top1": "1",
        "top2": "2",
        "top3": "1",
        "codeTime": "37:07:00",
        "bestWeek": "13.05.2024 – 19.05.2024\r"
    },
    {
        "number": "17",
        "username": "SunLY",
        "top1": "1",
        "top2": "",
        "top3": "3",
        "codeTime": "40:59:00",
        "bestWeek": "14.10.2024 – 20.10.2024\r"
    },
    {
        "number": "18",
        "username": "bitbox",
        "top1": "",
        "top2": "1",
        "top3": "2",
        "codeTime": "20:16:00",
        "bestWeek": "25.03.2024 – 31.03.2024\r"
    },
    {
        "number": "19",
        "username": "kosandron",
        "top1": "",
        "top2": "",
        "top3": "3",
        "codeTime": "27:24:00",
        "bestWeek": "07.10.2024 – 13.10.2024\r"
    },
    {
        "number": "20",
        "username": "Pashs.ba",
        "top1": "",
        "top2": "",
        "top3": "3",
        "codeTime": "27:53:00",
        "bestWeek": "22.05.2023 – 28.05.2023\r"
    },
    {
        "number": "21",
        "username": "PchyolkaZloy",
        "top1": "2",
        "top2": "",
        "top3": "1",
        "codeTime": "37:33:00",
        "bestWeek": "20.05.2024 – 26.05.2024\r"
    },
    {
        "number": "22",
        "username": "Vlad Baza",
        "top1": "1",
        "top2": "1",
        "top3": "1",
        "codeTime": "31:01:00",
        "bestWeek": "07.10.2024 – 13.10.2024\r"
    },
    {
        "number": "23",
        "username": "volkaris (Ilya)",
        "top1": "",
        "top2": "1",
        "top3": "2",
        "codeTime": "0:00:00",
        "bestWeek": "27.03.2023 – 02.04.2023\r"
    },
    {
        "number": "24",
        "username": ".&blueblood",
        "top1": "",
        "top2": "",
        "top3": "2",
        "codeTime": "2:33:00",
        "bestWeek": "20.05.2024 – 26.05.2024\r"
    },
    {
        "number": "25",
        "username": "KKhasan",
        "top1": "2",
        "top2": "",
        "top3": "",
        "codeTime": "44:32:00",
        "bestWeek": "22.05.2023 – 28.05.2023\r"
    },
    {
        "number": "26",
        "username": "AlexVashchenkov",
        "top1": "",
        "top2": "1",
        "top3": "",
        "codeTime": "31:31:00",
        "bestWeek": "20.11.2023 – 26.11.2023\r"
    },
    {
        "number": "27",
        "username": "dnbyyyy",
        "top1": "",
        "top2": "1",
        "top3": "",
        "codeTime": "17:01:00",
        "bestWeek": "03.06.2024 – 09.06.2024\r"
    },
    {
        "number": "28",
        "username": "Fleack",
        "top1": "1",
        "top2": "",
        "top3": "",
        "codeTime": "31:15:00",
        "bestWeek": "05.06.2023 – 11.06.2023\r"
    },
    {
        "number": "29",
        "username": "Menemi",
        "top1": "",
        "top2": "1",
        "top3": "",
        "codeTime": "24:37:00",
        "bestWeek": "28.10.2024 – 03.11.2024\r"
    },
    {
        "number": "30",
        "username": "Sayron",
        "top1": "1",
        "top2": "",
        "top3": "",
        "codeTime": "0:02:00",
        "bestWeek": "03.06.2024 – 09.06.2024\r"
    },
    {
        "number": "31",
        "username": "Suren",
        "top1": "",
        "top2": "",
        "top3": "1",
        "codeTime": "14:08:00",
        "bestWeek": "11.11.2024 – 17.11.2024\r"
    },
    {
        "number": "32",
        "username": "флэшдроппп",
        "top1": "",
        "top2": "",
        "top3": "",
        "codeTime": "1:24:00",
        "bestWeek": "04.11.2024 – 10.11.2024\r"
    },
    {
        "number": "33",
        "username": "Blayzzand",
        "top1": "",
        "top2": "",
        "top3": "",
        "codeTime": "19:19:00",
        "bestWeek": "11.11.2024 – 17.11.2024\r"
    },
    {
        "number": "34",
        "username": "blesssad",
        "top1": "",
        "top2": "",
        "top3": "",
        "codeTime": "5:56:00",
        "bestWeek": "18.03.2024 – 24.03.2024\r"
    },
    {
        "number": "35",
        "username": "DoKep",
        "top1": "",
        "top2": "",
        "top3": "",
        "codeTime": "",
        "bestWeek": " – \r"
    },
    {
        "number": "36",
        "username": "GoLDen",
        "top1": "",
        "top2": "",
        "top3": "",
        "codeTime": "9:33:00",
        "bestWeek": "17.04.2023 – 23.04.2023\r"
    },
    {
        "number": "37",
        "username": "grumbletumbles",
        "top1": "",
        "top2": "",
        "top3": "",
        "codeTime": "13:24:00",
        "bestWeek": "20.05.2024 – 26.05.2024\r"
    },
    {
        "number": "38",
        "username": "I_SER_I",
        "top1": "",
        "top2": "",
        "top3": "",
        "codeTime": "1:48:00",
        "bestWeek": "10.06.2024 – 16.06.2024\r"
    },
    {
        "number": "39",
        "username": "IgorM27",
        "top1": "",
        "top2": "",
        "top3": "",
        "codeTime": "1:17:00",
        "bestWeek": "24.06.2024 – 30.06.2024\r"
    },
    {
        "number": "40",
        "username": "iwshel",
        "top1": "",
        "top2": "",
        "top3": "",
        "codeTime": "14:03:00",
        "bestWeek": "17.06.2024 – 23.06.2024\r"
    },
    {
        "number": "41",
        "username": "kr1sps",
        "top1": "",
        "top2": "",
        "top3": "",
        "codeTime": "15:40:00",
        "bestWeek": "22.07.2024 – 28.07.2024\r"
    },
    {
        "number": "42",
        "username": "Ldrgv",
        "top1": "",
        "top2": "",
        "top3": "",
        "codeTime": "13:44:00",
        "bestWeek": "23.10.2023 – 29.10.2023\r"
    },
    {
        "number": "43",
        "username": "mityaiii",
        "top1": "",
        "top2": "",
        "top3": "",
        "codeTime": "5:47:00",
        "bestWeek": "16.09.2024 – 22.09.2024\r"
    },
    {
        "number": "44",
        "username": "n1nt3nd0",
        "top1": "",
        "top2": "",
        "top3": "",
        "codeTime": "12:03:00",
        "bestWeek": "07.10.2024 – 13.10.2024\r"
    },
    {
        "number": "45",
        "username": "notoriginallink",
        "top1": "",
        "top2": "",
        "top3": "",
        "codeTime": "0:30:00",
        "bestWeek": "05.08.2024 – 11.08.2024\r"
    },
    {
        "number": "46",
        "username": "rurkkk",
        "top1": "",
        "top2": "",
        "top3": "",
        "codeTime": "3:21:00",
        "bestWeek": "19.02.2024 – 25.02.2024"
    }
];
