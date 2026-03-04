import React, { } from 'react'
import mockdata from './data.json'
import Chart from 'react-apexcharts'
function Statistics() {
  // eslint-disable-next-line no-use-before-define
  let grades = [5,7,4]
  let total = mockdata.length;
  let p1 = mockdata.filter((student) => {
    return (0.6 * (student.examGrade) + 0.4 * (student.ratingGrade)).toFixed(2) > 4;
  })
  let fail = mockdata.filter((student) => {
    return (0.6 * (student.examGrade) + 0.4 * (student.ratingGrade)).toFixed(2) < 4;
  })
  let finalG = mockdata.map((student) => {
    return (0.6 * (student.examGrade) + 0.4 * (student.ratingGrade)).toFixed(2);
  })
  let totalfinal = finalG.reduce((a, b) => {
    return (Number(a) + Number(b))
  })
  let passed = p1.length;
  let failed = fail.length;
  let avg = (totalfinal / total).toFixed(2);
  let max = Math.max(...finalG);
  let min = Math.min(...finalG);
  let f1 = finalG.filter((grade) => {
    return (grade <= 4)
  })
  let f2 = finalG.filter((grade) => {
    return (grade > 4 && grade <= 7)
  })
  let f3 = finalG.filter((grade) => {
    return (grade > 7 && grade <= 10)
  })
  let zero_4 = f1.length;
  let four_7 = f2.length;
  let seven_10 = f3.length;
  return (
    <>
      <div className='stats'>
        <table className='statisticsTable'>
          <thead>
            <tr>
              <th>Status</th>
              <th>Marks</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Total Students</td>
              <td>{total}</td>
            </tr>
            <tr>
              <td>Total Passed</td>
              <td>{passed}</td>
            </tr>
            <tr>
              <td>Total Failed</td>
              <td>{failed}</td>
            </tr>
            <tr>
              <td>Average of All</td>
              <td>{avg}</td>
            </tr>
            <tr>
              <td>Max Grade of All</td>
              <td>{max}</td>
            </tr>
            <tr>
              <td>Min Grade of All</td>
              <td>{min}</td>
            </tr>
            <tr>
              <td>Final Grade 0-4</td>
              <td>{zero_4}</td>
            </tr>
            <tr>
              <td>Final Grade 4-7</td>
              <td>{four_7}</td>
            </tr>
            <tr>
              <td>Final Grade 7-10</td>
              <td>{seven_10}</td>
            </tr>
          </tbody>
        </table>
        <div className='barchat'>
          <Chart type='bar'
            width={200}
            height={300}
            series={[
              {
                name: "# of Students",
                data: [min, max, avg],
              }
            ]}
            options={{
              chart: {
                type: 'bar'
              },
              xaxis: {
                categories: ["Min. Marks", "Max Marks", "avg Marks"],
                title: {
                  text: "Status",
                  style: { color: "#f90000", fontSize: 15 }
                }
              },
              yaxis: {
                labels: {
                  style: { colors: "#f90000" }
                },
                title: {
                  text: "Marks",
                  style: { color: "#f90000" }
                }
              }
            }}
          >
          </Chart>
          <Chart type='pie'
  width={500}
  height={500}
  series={grades}
  options={{
    labels:['Final-Grade 0-4', 'Final-Grade 4-7','Final-Grade 7-10'],
    legend:{
      markers: {
        width: 12,
        height: 12,
        strokeWidth: 10,
        strokeColor: '#fff',}
    }
  }}>
</Chart>
        </div>

      </div>
    </>
  )
}
export default Statistics