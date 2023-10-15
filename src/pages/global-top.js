import React from "react"
import FetchCsvData from "../components/fetch-csv-data";

export default function GlobalTop() {
  const csvData = FetchCsvData("2PACX-1vSBOyyJfO0qXuA8WIxiQsDD5wVib2NT7U2RwrvV8dv26OZKKBn5ZJyS-VT3f-f_ekb3JtcxgdAA3Thb");

  return (
    <div className="global-top">
      <div className="global-top-wrapper">
        <div className="global-top-title">
          <h1 className="black-highlight">Global Top • ITMO Team</h1>
          <p className="blue-highlight">[ {csvData.length} members ]</p>
        </div>

        <table className="global-top-table">
          <thead>
          <tr className="global-top-table-heading">
            <th>Rank</th>
            <th>Programmer</th>
            <th>Top 1</th>
            <th>Top 2</th>
            <th>Top 3</th>
            <th>Code Time</th>
            <th>Best week</th>
          </tr>
          </thead>
          <tbody>
          {
            csvData.map((item) => (
              <tr className="global-top-table-row">
                <td>{item.number}</td>
                <td>{item.username}</td>
                <td>{item.top1}</td>
                <td>{item.top2}</td>
                <td>{item.top3}</td>
                <td>{item.codeTime}</td>
                <td>{item.startOfWeek} - {item.endOfWeek}</td>
              </tr>
            ))
          }
          </tbody>
        </table>
      </div>
    </div>
  )
}