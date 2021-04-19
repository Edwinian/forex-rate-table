const isEven = number => {
  return Math.floor(number) % 2 === 0
}

async function fetchData () {
  const res = await fetch(
    'http://data.fixer.io/api/latest?access_key=45bc52dcfe15b76ef85137602f3df2b0'
  )

  if (!res.ok) {
    throw new Error(`Error Occurred: ${res.status}`)
  }

  const json = await res.json()

  const bids = json.rates
  console.log('bids', bids)

  const asks = { ...bids }
  Object.keys(asks).forEach(currency => (asks[currency] += 10.0002))
  console.log('asks', asks)

  // combine the two values of each currency into a pair
  const quotes = { ...bids }
  Object.keys(quotes).forEach(
    currency => (quotes[currency] = [bids[currency], asks[currency]])
  )
  console.log('quotes', quotes)

  renderData(quotes)
}

const renderData = quotes => {
  let html = ''

  Object.keys(quotes).forEach(currency => {
    html += `      
    <div class="row">
      <div class="col-4"><b>${currency}</b></div>
      <div class="col-4 ${
        currency === 'HKD' || isEven(quotes[currency][0]) ? 'highlight' : ''
      }">
      ${quotes[currency][0]}
      </div>
      <div class="col-4 ${
        currency === 'HKD' || isEven(quotes[currency][1]) ? 'highlight' : ''
      }">
      ${quotes[currency][1]}
      </div>
    </div>
  `
  })

  document.querySelector('.data').innerHTML = html
}

fetchData()
