import {useEffect, useState} from "react"
import axios from "axios";

export default function FetchCsvData(uniqueTableCode) {
  const [csvData, setCsvData] = useState([]);

  useEffect(() => {
    fetchCSVData();
  }, []);

  // page 1 // 2PACX-1vTkWoLikMzDn43FXNi_yS73ReU3Ay_RT1ue4N69X1omhlECHWqas20aGHCzGQ1T9bw4FTG2W975pbRP
  // page 2 // 2PACX-1vSBOyyJfO0qXuA8WIxiQsDD5wVib2NT7U2RwrvV8dv26OZKKBn5ZJyS-VT3f-f_ekb3JtcxgdAA3Thb
  const fetchCSVData = () => {
    const csvUrl = `https://docs.google.com/spreadsheets/d/e/${uniqueTableCode}/pub?gid=0&single=true&output=csv`;

    axios.get(csvUrl)
      .then((response) => {
        const parsedCsvData = parseCSV(response.data);
        setCsvData(parsedCsvData);
        // console.log(parsedCsvData)
      })
      .catch((error) => {
        console.error("Error fetching CSV data:", error);
      });
  }

  function parseCSV(csvText) {
    const rows = csvText.split(/\r?\n/);
    const headers = rows[0].split(",");
    const data = [];
    for (let i = 1; i < rows.length; i++) {
      const rowData = rows[i].split(",");
      const rowObject = {};
      for (let j = 0; j < headers.length; j++) {
        rowObject[headers[j]] = rowData[j];
      }
      data.push(rowObject);
    }
    return data;
  }

  // TODO: подумать над сортировкой
  // {
  //   csvData.map((item) => (
  //     console.log(`${item.username}: ${item.top1 * 3} + ${item.top2 * 2} + ${item.top3} = ${Number(item.top1 * 3) + Number(item.top2 * 2) + Number(item.top3)}`)
  //   ))
  // }

  return csvData;
}