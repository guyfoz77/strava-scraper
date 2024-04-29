import axios from 'axios'
import cheerio from 'cheerio'

export default async function scrapeTable(url) {
  const response = await axios.get(url)
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
  console.log(data)
  return data
}
