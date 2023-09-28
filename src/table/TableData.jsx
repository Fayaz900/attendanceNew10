import React, { useEffect, useState } from "react";
import "./Table.css";

function TableData(props) {

   useEffect(()=>{
    fetchCombined()
    fetchCombined2()
   },[props.attendance])
    

    const allStudentData = props.allData
    // console.log(props.attendance)
    // console.log(allStudentData)
  
    // Create an empty result array to store the joined elements

    var result = [];
    var finalResult=[];

    const fetchCombined=()=>{
      for (let i = 0; i < allStudentData.length; i++) {
        let obj1 = allStudentData[i];
        let obj2 = props.attendance.find(item => item.ROLL_NO.toLowerCase() === obj1.roll_no );
        if (obj2) {
            let mergedObj = { ...obj1, ...obj2 };
            result.push(mergedObj);
        }
    }  
  console.log(result);
    }

    const fetchCombined2=()=>{
      for (let i = 0; i < props.attendance.length; i++) {
        let obj1 = props.attendance[i];
        let obj2 = result.find(item => item.roll_no.toLowerCase() === obj1.ROLL_NO.toLowerCase() );
        if (obj2) {
            let mergedObj = { ...obj1, ...obj2 };
            finalResult.push(mergedObj);
        }
    }  
  console.log("final",finalResult);
    }

    fetchCombined2()
 
    

    const allRoll = props.allData.map((elem)=>{
        return elem.roll_no
    })

    const checkRoll =(dataRoll)=>{
        return allRoll.includes(dataRoll.toLowerCase())
    }
    
  return (
    <table>
      <caption>Statement Summary</caption>
      <thead>
        <tr>
          <th scope="col">Roll</th>
          <th scope="col">Name</th>
          <th scope="col">Total minutes</th>
        </tr>
      </thead>
      <tbody>
     
        {props.attendance.map((item, index) => {
          return (
            <tr key={index}>
              <td data-label="Roll NO">{item.ROLL_NO} {checkRoll(item.ROLL_NO)? '♥' : 'x'}</td>
              <td data-label="Name">{item.student_name}</td>
              <td data-label="Total Minutes">{item.TOTAL_MINUTES}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default TableData;
