





window.onload = function(){

  //Show Modal Once Per Visit Cookies
 
  let popup = Cookies.set('popUpShown');

  if (!popup) {
        swal("Welcome to CryptoTrade ", " This proof of concept cryptocurrency trading website allows you to enter apikeys from Poloniex and place actual trades. This is a fully functional cryptocurrency trading website.");
          Cookies.set('popUpShown', true,{ expires: 1 });
      }

    axios.get('/trading/accounts')
    .then((results)=>{
  
      let bdiv = document.getElementById('btc');
      const bspan = document.createElement('span');
      bspan.innerText = results.data.BTC;
      bdiv.appendChild(bspan);
  
      let zdiv = document.getElementById("ethwallet");
      const zspan = document.createElement('span');
      zspan.innerText = results.data.ETH;
      zdiv.appendChild(zspan);
      
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
      
        axios.get('/trading/tickereth')
      .then((results)=>{
        console.log(results)
        document.getElementById('usdeth').innerText = results.data.price;

      }).catch((err)=>{
              console.log(err);
          })
     
  }, 4000 );


  //Get the deposit address
  
    axios.get('/trading/deposit')
    .then((results)=>{

      let bdiv = document.getElementById('deposit');
      const bspan = document.createElement('span')
      bspan.innerText = results.data.BTC
      bdiv.appendChild(bspan)

       if(window.location.pathname === '/trading') {
         let div = document.getElementById("ethdeposit");
         const span = document.createElement('span')
         span.innerText = results.data.ETH
         div.appendChild(span)
         
       } else if(window.location.pathname === '/xmr') {

         let div = document.getElementById("xmrdeposit");
         const span = document.createElement('span')
         span.innerText = results.data.XMR
         div.appendChild(span)
       }

  
    }).catch((error)=>{
      console.log(error)
    })


      //Sell ETH
document.getElementById('sellethbtn').onclick =function(e){
  e.preventDefault();
    let amountx = document.getElementById('amountEthsell');
    let ratex = document.getElementById('rateethsell');
  
    axios.post('/trading/ethbtcselling',{
  
  
    amount:amountx.value,
    rate: ratex.value,
  
  
    }).then((results)=>{
  
  console.log(results);
  
      ratex.value = '';
      amountx.value = '';
  
    }).catch((err)=>{
      console.log(err)
    })
  }
  
  
  //Buy ETH
  document.getElementById('buyethbtn').onclick =function(e){
    e.preventDefault();
      let amountb = document.getElementById('amountEth');
      let rateb = document.getElementById('rateeth');
    
      axios.post('/trading/ethbtcbuy',{
    
    
      amount:amountb.value,
      rate: rateb.value,
    
    
      }).then((results)=>{
    
    console.log(results);
    
        rateb.value = '';
        amountb.value = '';
    
      }).catch((err)=>{
        console.log(err)
      })
    }
      

//load the chart 
let chart = new cryptowatch.Embed('poloniex', 'ethbtc')
 
chart.mount('#chart-contain');

  }//end
