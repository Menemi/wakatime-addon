import FetchCsvData from "../components/fetch-csv-data";
import React from "react";
import BarDiagram from "../components/bar-diagram";
import GetRandomColors from "../components/get-random-colors";
import DoughnutDiagram from "../components/doughnut-diagram";

export default function Diagrams() {
  const csvData = FetchCsvData("2PACX-1vTkWoLikMzDn43FXNi_yS73ReU3Ay_RT1ue4N69X1omhlECHWqas20aGHCzGQ1T9bw4FTG2W975pbRP");

  function getWeekTop() {
    let userTimeArr = [];
    let usernames = [];
    let codeTimes = [];

    let i = 0
    csvData.every(item => {
      const codeTimeText = item.currentWeekCodeTime.split(":");
      const codeTimeNumber = Number(codeTimeText[0]) + Number(codeTimeText[1]) / 60
      usernames.push(item.username)
      codeTimes.push(codeTimeNumber)
      i++;

      return i !== 10;
    });

    userTimeArr.push(usernames)
    userTimeArr.push(codeTimes)

    return userTimeArr;
  }

  function getAvgByDayWeekTop() {
    let userTimeArr = [];
    let usernames = [];
    let codeTimes = [];

    let i = 0
    csvData.every(item => {
      const codeTimeText = item.avgDayCodeTime.split(":");
      const codeTimeNumber = Number(codeTimeText[0]) + Number(codeTimeText[1]) / 60
      usernames.push(item.username)
      codeTimes.push(codeTimeNumber)
      i++;

      return i !== 10;
    });

    userTimeArr.push(usernames)
    userTimeArr.push(codeTimes)

    return userTimeArr;
  }

  function getIdes() {
    let ideNames = [];
    let ideCount = [];

    csvData.forEach((item) => {
      if (item.ide !== "" && (ideNames.find((e) => e === item.ide) === undefined)) {
        ideNames.push(item.ide)
      }
    });

    ideNames.forEach((ide) => {
      let counter = 0;
      csvData.forEach((item) => {
        if (item.ide === ide) {
          counter++;
        }
      })

      ideCount.push([counter])
    })

    return [ideNames, ideCount];
  }

  function getLanguages() {
    let languageNames = [];
    let languageCount = [];

    csvData.forEach((item) => {
      if (item.language !== "" && (languageNames.find((e) => e === item.language) === undefined)) {
        languageNames.push(item.language)
      }
    });

    languageNames.forEach((language) => {
      let counter = 0;
      csvData.forEach((item) => {
        if (item.language === language) {
          counter++;
        }
      })

      languageCount.push([counter])
    })

    return [languageNames, languageCount];
  }

  const weekTop = getWeekTop();
  const labelsWeekTop = weekTop[0];
  const valuesWeekTop = weekTop[1];

  const avgByDayWeekTop = getAvgByDayWeekTop();
  const labelsAvgByDayWeekTop = avgByDayWeekTop[0];
  const valuesAvgByDayWeekTop = avgByDayWeekTop[1];

  const ides = getIdes();
  const labelsIdes = ides[0];
  const valuesIdes = ides[1];

  const languages = getLanguages();
  const labelsLanguages = languages[0];
  const valuesLanguages = languages[1];

  const ideColors = GetRandomColors(ides[0].length, 0.35, 1)
  const languageColors = GetRandomColors(languages[0].length, 0.35, 1)

  return (
    <div className="diagrams">
      <div className="diagrams-wrapper">
        <div className="diagrams-title">
          <h1 className="black-highlight">Diagrams • ITMO Team</h1>
          <p className="blue-highlight">[ {csvData.length} members ]</p>
        </div>
        <div className="diagrams-table">
          {
            BarDiagram(labelsWeekTop, valuesWeekTop, "Week Top [code time hours]", "Code time [hours]",
              ["rgba(255, 215, 0, 0.6)", "rgba(192, 192, 192, 0.6)", "rgba(205, 127, 50, 0.6)", "rgba(255, 255, 255, 0.6)", "rgba(255, 255, 255, 0.6)", "rgba(255, 255, 255, 0.6)", "rgba(255, 255, 255, 0.6)", "rgba(255, 255, 255, 0.6)", "rgba(255, 255, 255, 0.6)", "rgba(255, 255, 255, 0.6)"],
              ["rgba(255, 215, 0, 1)", "rgba(192, 192, 192, 1)", "rgba(205, 127, 50, 1)", "rgba(255, 255, 255, 1)", "rgba(255, 255, 255, 1)", "rgba(255, 255, 255, 1)", "rgba(255, 255, 255, 1)", "rgba(255, 255, 255, 1)", "rgba(255, 255, 255, 1)", "rgba(255, 255, 255, 1)"],
              3, "single-diagram-wrapper")
          }
          {
            DoughnutDiagram(labelsLanguages, valuesLanguages, "", "count", languageColors[0], languageColors[1], 3, "single-diagram-wrapper")
          }
          {
            BarDiagram(labelsAvgByDayWeekTop, valuesAvgByDayWeekTop, "Average by Day Top [code time hours]", "Code time [hours]",
              ["rgba(255, 215, 0, 0.6)", "rgba(192, 192, 192, 0.6)", "rgba(205, 127, 50, 0.6)", "rgba(255, 255, 255, 0.6)", "rgba(255, 255, 255, 0.6)", "rgba(255, 255, 255, 0.6)", "rgba(255, 255, 255, 0.6)", "rgba(255, 255, 255, 0.6)", "rgba(255, 255, 255, 0.6)", "rgba(255, 255, 255, 0.6)"],
              ["rgba(255, 215, 0, 1)", "rgba(192, 192, 192, 1)", "rgba(205, 127, 50, 1)", "rgba(255, 255, 255, 1)", "rgba(255, 255, 255, 1)", "rgba(255, 255, 255, 1)", "rgba(255, 255, 255, 1)", "rgba(255, 255, 255, 1)", "rgba(255, 255, 255, 1)", "rgba(255, 255, 255, 1)"],
              3, "single-diagram-wrapper")
          }
          {
            DoughnutDiagram(labelsIdes, valuesIdes, "", "count", ideColors[0], ideColors[1], 3, "single-diagram-wrapper")
          }
        </div>
      </div>
    </div>
  )
}