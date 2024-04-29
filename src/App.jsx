import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios'

import './App.css'

function App() {
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('http://localhost:3000/scrape')
      setData(result.data)
    }

    fetchData()
  }, [])

  console.log(data)

  return <></>
}

export default App
