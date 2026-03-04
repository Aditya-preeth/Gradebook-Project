import React, { useState } from 'react'
import MockData from './data.json'
import './CSS/Table.css'
import Popup1 from './Popup1';
import Statistics from './Statistic';
function Table() {
    const [data, setData] = useState(MockData);
    const [order, setOrder] = useState("ASC");
    const [search, setSearch] = useState("");
    const [status, setStats] = useState("")
    const [openPopup, setOpenPopup] = useState(false);
    const [index, setIndex] = useState(0);
    const [statistics, setstatistics] = useState(false);
    const [sbtn, setsbtn] = useState("OpenStatistics");
    const [changeNum, setchangeNum] = useState('0-9');
    const [changeName, setchangeName] = useState('a-z');
    const [selectedRows, setSelectedRows] = useState([]);
  const handleRowClick = (id) => {
    let newSelectedRows;
    if (selectedRows.includes(id)) {
      newSelectedRows = selectedRows.filter((rowId) => rowId !== id);
    } else {
      newSelectedRows = [...selectedRows, id];
    }
    setSelectedRows(newSelectedRows);
  };
    const popupOn = (i) => {
        setOpenPopup(true)
        setIndex(i)
    }
    const popupOff = () => {
        setOpenPopup(false)
    }
    function sortByStatus(col, col2, status) {
        if (status === "all") {
            setData(MockData)
        } else {
            setData(MockData);
            // eslint-disable-next-line
            const sorted = [...MockData].filter((val) => {     
                let a = Number(val[col]) * 0.6 + Number(val[col2]) * 0.4
                if (status === "fail")
                    return a < 4;
                else if (status === "pass")
                    return a > 4;
            })
            setData(sorted)
        }
        setStats(status)
    }
    const sortbyName = (col1) => {
        if (order === "ASC") {
            const sorted = [...data].sort((a, b) => {
                return a[col1].toLowerCase() > b[col1].toLowerCase() ? 1 : -1;
            })
            setData(sorted)
            setOrder("DSC")
            setchangeName('a-z');
        }
        if (order === "DSC") {
            const sorted = [...data].sort((a, b) => {
                return a[col1].toLowerCase() < b[col1].toLowerCase() ? 1 : -1;
            })
            setData(sorted)
            setOrder("ASC")
            setchangeName('z-a');
        }
    }
    const sortbyNumber = (col1, col2) => {
        if (order === "ASC") {
            const sorted = [...data].sort((a, b) => {
                a = Number(a[col1]) * 0.6 + Number(a[col2]) * 0.4
                b = Number(b[col1]) * 0.6 + Number(b[col2]) * 0.4
                return a > b ? 1 : -1;
            })
            setData(sorted)
            setOrder("DSC")
            setchangeNum('9-0')
        }
        if (order === "DSC") {
            const sorted = [...data].sort((a, b) => {
                a = Number(a[col1]) * 0.6 + Number(a[col2]) * 0.4
                b = Number(b[col1]) * 0.6 + Number(b[col2]) * 0.4
                return a < b ? 1 : -1;
            })
            setData(sorted)
            setOrder("ASC")
            setchangeNum('0-9')
        }
    }
    // Statistics
    const getStatistics = () => {
        if (statistics) {
            setstatistics(false)
            setsbtn("Open Statistics")
        }
        else {
            setstatistics(true)
            setsbtn("Close Statistics")
        }
    }
    return (
        <div>
            <button onClick={() => sortByStatus("examGrade", "ratingGrade", "all")} className='all'>All</button>
            <button onClick={() => sortByStatus("examGrade", "ratingGrade", "pass")} className='pass'>Passed</button>
            <button onClick={() => sortByStatus("examGrade", "ratingGrade", "fail")} className='fail'>Failed</button>
            <button onClick={() => sortbyNumber("examGrade", "ratingGrade")} className='cnum'>{changeNum}</button>
            <button onClick={() => sortbyName("name")} className='cname'>{changeName}</button>
            <input type="Search" id="search" onChange={(e) => setSearch(e.target.value)} value={search} placeholder='Search' />
            <table className='Table'>
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Name</th>
                        <th>TicketNo</th>
                        <th>RatingGrade</th>
                        <th>ExamGrade</th>
                        <th>FinalGrade</th>
                        <th>Status</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                    {// eslint-disable-next-line
                        data.filter((value) => {
                            if (search === "") {
                                return value;
                            }
                            else if (value.name.toLowerCase().includes(search.toLowerCase())) {
                                return value;
                            }
                        }).map((d, i) => {
                            let finalgrade = (0.6 * d.examGrade + 0.4 * d.ratingGrade).toFixed(2);
                            let status;
                            if (finalgrade > 4) {
                                status = 'passed'
                            } else {
                                status = 'failed'
                            }
                            return <tr key={d.id}
            onClick={() => handleRowClick(d.id)}
            className={selectedRows.includes(d.id) ? 'selected' : ''}>
                                <td>{d.id}</td>
                                <td>{d.name}</td>
                                <td>{d.ticketNo}</td>
                                <td>{d.ratingGrade}</td>
                                <td>{d.examGrade}</td>
                                <td>{finalgrade}</td>
                                <td>{status}</td>
                                <td><center><button id='btnDetails' onClick={() => popupOn(i)}>Detail</button></center></td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
            {openPopup && <Popup1 popupOff={popupOff} i={index} data={data} />}
            <button className='statisticsBtn' onClick={getStatistics}>{sbtn}</button>
            {statistics && <Statistics data={data} total={MockData.length} />}
        </div>
    )
}
export default Table
