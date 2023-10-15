import React from "react"
import FetchCsvData from "../components/fetch-csv-data";

export default function Leaderboard() {
  const csvData = FetchCsvData("2PACX-1vTkWoLikMzDn43FXNi_yS73ReU3Ay_RT1ue4N69X1omhlECHWqas20aGHCzGQ1T9bw4FTG2W975pbRP");

  function getTotalWeekTime() {
    let summaryCodeTime = [0, 0, 0];
    csvData.forEach(item => {
      let tempCodeTimeText = item.currentWeekCodeTime.split(":");
      summaryCodeTime[0] += Number(tempCodeTimeText[0]);
      summaryCodeTime[1] += Number(tempCodeTimeText[1]);
      summaryCodeTime[2] += Number(tempCodeTimeText[2]);
    })

    summaryCodeTime[1] += (summaryCodeTime[2] - (summaryCodeTime[2] % 60)) / 60;
    summaryCodeTime[2] %= 60;
    summaryCodeTime[0] += (summaryCodeTime[1] - (summaryCodeTime[1] % 60)) / 60;
    summaryCodeTime[1] %= 60;
    return [summaryCodeTime[0], summaryCodeTime[1]];
  }

  let [hours, minutes] = getTotalWeekTime();

  // "number": "1",
  // "username": "yaaarsl_v",
  // "currentWeekCodeTime": "19:34:00",
  // "language": "Python",
  // "ide": "PyCharm",
  // "avgDayCodeTime": "4:53:33",
  // "mainProject": "Petshop-backend",
  // "isCodingNow": "❌"

  return (
    <div className="leaderboard">
      <div className="leaderboard-wrapper">
        <div className="leaderboard-title">
          <h1 className="black-highlight">Leaderboard • ITMO Team</h1>
          <p className="blue-highlight">[ {csvData.length} members ]</p>
        </div>
        <h2>
          <a className="black-highlight">{hours} hrs {minutes} mins</a> in the <a className="blue-highlight">Last 7
          Days</a>.
        </h2>

        <table className="leaderboard-table">
          <thead>
          <tr className="leaderboard-table-heading">
            <th>Rank</th>
            <th>Programmer</th>
            <th>Hours Coded</th>
            <th>Daily Average</th>
            <th>Project</th>
            <th>Coding Now</th>
          </tr>
          </thead>
          <tbody>
          {
            csvData.map((item) => (
              <tr className="leaderboard-table-row">
                <td>{item.number}</td>
                <td>{item.username}</td>
                <td>{item.currentWeekCodeTime}</td>
                <td>{item.avgDayCodeTime}</td>
                <td><a className="black-highlight">{item.mainProject}</a> [{item.ide} - {item.language}]</td>
                <td>{item.isCodingNow}</td>
              </tr>
            ))
          }
          </tbody>
        </table>
      </div>
    </div>
  )
}