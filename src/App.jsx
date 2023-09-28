import { useEffect, useState } from 'react'
import './App.css'
import * as XLSX from 'xlsx'
import TableData from './table/TableData'
import axios from 'axios'

function App() {
  
  const [item, setItem] = useState([])
  const [all,setAll]=useState([])

  useEffect(()=>{
    axios.get('http://localhost:8055/class8/all')
    .then(res=>setAll(res.data))
    .catch(err=>console.log(err))
  },[])
 

  const readExcel=(file)=>{
    const promise = new Promise((resolve,reject)=>{
      const fileReader = new FileReader()
      fileReader.readAsArrayBuffer(file)

      fileReader.onload=(e)=>{
        const bufferArray= e.target.result
        const wb=XLSX.read(bufferArray,{type:'buffer'})
        const wsname=wb.SheetNames[0]
        const ws = wb.Sheets[wsname]
        const data = XLSX.utils.sheet_to_json(ws)

        resolve(data);
      }
      fileReader.onerror=((error)=>{
        reject(error)
      })
    })

    promise.then((d)=>{
     
      setItem(d)
    })
  }

  return (
    <div className='table-parent'>
      <input type="file" onChange={(e)=>{
        const file = e.target.files[0]
        readExcel(file)
      }} />
      <TableData attendance={item}  allData={all}/>
    </div>
  )
}

export default App
