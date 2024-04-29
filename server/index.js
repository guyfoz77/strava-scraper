import express from 'express'
import axios from 'axios'
import cheerio from 'cheerio'
import cors from 'cors'

const app = express()

app.use(cors({ origin: 'http://localhost:5173' }))

app.get('/scrape', async (req, res) => {
  const targetURL = 'https://www.parkrun.org.uk/parkrunner/3432725/all/'
  const response = await axios.get(targetURL, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
    },
  })
  const $ = cheerio.load(response.data)
  const data = []

  $('table#results tr').each((i, row) => {
    const rowData = []
    $(row)
      .find('td')
      .each((j, cell) => {
        rowData.push($(cell).text().trim())
      })
    data.push(rowData)
  })

  res.json(data)
})

app.listen(3000, () => console.log('Server running on port 3000'))
