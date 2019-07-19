window.onload = function(){

  //Gets Balance of accounts

  axios.get('/trading/accounts')
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

    axios.get('/trading/ticker')
    .then((results)=>{
      console.log(results)
      document.getElementById('usdbtc').innerText = results.data.price;
      
    }).catch((err)=>{

    console.log(err);
    })
    
      axios.get('/trading/tickerxmr')
    .then((results)=>{
    
      document.getElementById('usdxmr').innerText = results.data.price;

    }).catch((err)=>{
            console.log(err);
        })
   
}, 10000 );


//Get the deposit address

  axios.get('/trading/deposit')
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


//Buy ETH
document.getElementById('xmrbuybtn').onclick =function(e){
  e.preventDefault();
    let amountxmr = document.getElementById('amountxmr');
    let ratexmr = document.getElementById('ratexmr');

    if(amountxmr.value==='' || ratexmr.value==='' ){

      let message = document.getElementById('msg');
      message.innerText =' Please Check Input Fields'

    }else{
  
    axios.post('/trading/xmrbuy',{
  
  
    amount:amountxmr.value,
    rate: ratexmr.value,
  
  
    }).then((results)=>{
  
      let message = document.getElementById('msg');
      message.innerHTML =`${results.data.orderNumber}`
      
      ratexmr.value = '';
      amountxmr.value = '';
  
    }).catch((err)=>{
      let message = document.getElementById('msg');
      message.innerText = "Bad Request";
    })
  }
}



  //Sell ETH
  document.getElementById('xmrsellbtn').onclick =function(e){
    e.preventDefault();


    let ratex = document.getElementById('ratexmrselling');
      let amountx = document.getElementById('amountxmrselling');

      if(amountx.value==='' || ratex.value==='' ){

        let message = document.getElementById('msg');
        message.innerText =' Please Check Input Fields'

      }else{
    
      axios.post('/trading/ethbtcselling',{
    
    
      amount:amountx.value,
      rate: ratex.value,
    
    
      }).then((results)=>{
    
        let message = document.getElementById('msg');
        message.innerHTML =`${results.data.orderNumber}`
        
    
        ratex.value = '';
        amountx.value = '';
    
      }).catch((err)=>{
        let message = document.getElementById('msg');
        message.innerText = "Bad Request";
      })
    }
    
  }
          

}//end
