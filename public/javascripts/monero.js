window.onload = function(){

  //Gets Balance of accounts

  axios.get('http://localhost:4000/trading/accounts')
  .then((results)=>{

    let abdiv = document.getElementById('btc');
    const abspan = document.createElement('span');
    abspan.innerText = results.data.BTC;
    abdiv.appendChild(abspan);

    let xdiv = document.getElementById("xmrwallet");
    const xspan = document.createElement('span');
    xspan.innerText = results.data.XMR;
    xdiv.appendChild(xspan);

  })
  .catch((err)=>{
      console.log(err);
  })


//Get tickers 

  setInterval(() => {

    axios.get('http://localhost:4000/trading/ticker')
    .then((results)=>{
      console.log(results)
      document.getElementById('usdbtc').innerText = results.data.price;
      
    }).catch((err)=>{

    console.log(err);
    })
    
      axios.get('http://localhost:4000/trading/tickerxmr')
    .then((results)=>{
    
      document.getElementById('usdxmr').innerText = results.data.price;

    }).catch((err)=>{
            console.log(err);
        })
   
}, 10000 );


//Get the deposit address

  axios.get('http://localhost:4000/trading/deposit')
  .then((results)=>{

    let bdiv = document.getElementById('deposit');
    const bspan = document.createElement('span');
    bspan.innerText = results.data.BTC;
    bdiv.appendChild(bspan);

    let div = document.getElementById("xmrdeposit");
    const span = document.createElement('span');
    span.innerText = results.data.XMR;
    div.appendChild(span);

  }).catch((error)=>{
    console.log(error)
  })




    

//load the chart 
let chart = new cryptowatch.Embed('poloniex', 'xmrbtc')

chart.mount('#chart-contain');

}//end
