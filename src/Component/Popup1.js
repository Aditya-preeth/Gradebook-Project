import React from 'react'
import './CSS/popup.css'
function Popup1(props) {
  return (
    <>
      <div className="popup">
        <h1>Student Details</h1>
        <p>Name of the Student: {props.data[props.i].name}</p>
        <p>Address: {props.data[props.i].detail.Address}</p>
        <p>Email Address: {props.data[props.i].detail.Email}</p>
        <p>Contact: {props.data[props.i].detail.Contact}</p>
        <button onClick={props.popupOff} id='btnClose'>close</button>
      </div>
    </>
  )
}

export default Popup1
