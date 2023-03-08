import React, { useState, useEffect } from 'react'
import Chart from 'react-apexcharts'
import Navbar from './Navbar';

function App() {
  const [options, setOptions] = useState({
    chart: {
      type: 'bar'
    },
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995]
    }
  })
  const [series, setSeries] = useState([
    {
      name: 'a',
      data: [10, 20, 30, 40, 50]
    },
    {
      name: 'b',
      data: [55, 45, 35, 25, 15]
    }
  ])

  useEffect(() => {
    const tDate = new Date()
    const tDay = tDate.getDate() - 7
    tDate.setDate(tDay)
    const startDate = tDate.toISOString().slice(0,10)
    document.getElementById("date").innerHTML = startDate
    alert(startDate)
    fetch('https://www.melivecode.com/api/pets/7days/' + startDate)
      .then(res => res.json())
      .then((result) => {
        setOptions({
          ...options,
          xaxis: {
            categories: result.categories
          }
        })
        // setSeries(result.series)
        setSeries(result.series)
      })
  }, [])

  return (
    <div>
      <Navbar/>
      <p id ="date" align="center"></p>
      <Chart
        options={options}
        series={series}
        type='bar'
      />
    </div>
  )
}

export default App