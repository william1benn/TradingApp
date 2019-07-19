
const express = require('express');
const router  = express.Router();
const User  = require("../models/User");
const Poloniex   = require('poloniex-api-node');
const CoinbasePro = require('coinbase-pro');
const cryptowatch = require('cryptowatch')
const encryptor = require('simple-encryptor')('imaginethatiwentandgotit');
const alerts = require("sweetalert");

//const coinPro = new CoinbasePro.PublicClient();

//For ticker
cryptoW = new cryptowatch()




//RETURN BTC/USD TICKER PRICE
router.get('/trading/ticker',(req,res,next)=>{

return cryptoW.price('btc', 'usd', 'bitfinex')
.then((ticker)=>{

    res.json(ticker)

  }).catch((error)=>{
    console.log(error)
  })

})

router.get('/trading/tickereth',(req,res,next)=>{

  return cryptoW.price('eth', 'usd', 'bitfinex')
  .then((ticker)=>{
  
      res.json(ticker)
  
    }).catch((error)=>{
      console.log(error)
    })
  
  })


//LOAD THE TRADING PAGE
router.get('/',(req,res,next)=>{



res.render('user/trading');
})


//GETS USER BTC BALANCE
router.get('/trading/accounts',(req,res,next)=>{

  User.findById(req.user._id).then(theUser=> {

    let sKey = encryptor.decrypt(theUser.secretKey);

    let x = sKey.toString()
  
let polo = new Poloniex(theUser.apikey,x,nonce=38);

return polo.returnBalances()

.then((results)=>{

  res.json(results)

})

  }).catch((err)=>{

    console.log(err)
  })

})



//Return BTC DESPOT ADDRESS
router.get('/trading/deposit',(req,res,next)=>{
  User.findById(req.user._id).then(theUser=> {

    let sKey = encryptor.decrypt(theUser.secretKey);

    let x = sKey.toString()
  
let polo = new Poloniex(theUser.apikey,x,nonce=38);

return polo.returnDepositAddresses()
}).then((results)=>{

 
  res.json(results)

}).catch((error)=>{
  console.log(error)
})

})


//Market Trade/Charts
router.get('/trading',(req,res,next)=>{

  res.render('user/trading');
  })

  
  //GETS USER TRADE HISTORY
  router.get('/trading/history/btc',(req,res,next)=>{
  
    User.findById(req.user._id).then(theUser=> {
  
      let sKey = encryptor.decrypt(theUser.secretKey);
  
      let x = sKey.toString()
    
  let polo = new Poloniex(theUser.apikey,x,nonce=38);

   const BTChistory = polo.returnMyTradeHistory("BTC_ETH").then((history)=>{

    upHistory = history.slice(0,30)

    console.log(upHistory)

     User.findByIdAndUpdate(req.user._id, {tradeHistory: upHistory}).then((xx)=>{
       
       res.json("updated");
     
     }).catch((err)=>{
       console.log(err)
     })
  
    }).catch((err)=>{
  
      console.log(err)
    })
  
  })
})


//Get Balance from Database 

router.get('/trading/history/btceth',(req,res,next)=>{

  User.findById(req.user._id).then(theUser=> {

  res.json(theUser)

  }).catch((err)=>{

    console.log(err)

   res.json(err);

  })

})

//Buy ETH

router.post('/trading/ethbtcbuy',(req,res,next)=>{
  User.findById(req.user._id).then(theUser=> {

    let sKey = encryptor.decrypt(theUser.secretKey);

    let x = sKey.toString()
  
let polo = new Poloniex(theUser.apikey,x,nonce=38);

let info = {
  rate:req.body.rate ,
  amount:req.body.amount,
}

return polo.buy('BTC_ETH', info.rate, info.amount)

}).then((results)=>{

  res.json(results)

}).catch((error)=>{
console.log(error)
 // res.json({message:"You mad a Bad Request, please check your parameters BUY"})
})

})

router.post('/trading/ethbtcselling',(req,res,next)=>{
console.log(req.body)

User.findById(req.user._id).then(theUser=> {

    let sKey = encryptor.decrypt(theUser.secretKey);

    let x = sKey.toString()
  
let polo = new Poloniex(theUser.apikey,x,nonce=38);

let info = {
  rate:req.body.rate,
  amount:req.body.amount,
}

 return polo.sell('BTC_ETH', info.rate, info.amount)

}).then((results)=>{

  res.json(results)

  }).catch((error)=>{
  //Here is the handled error

  console.log(error)
  //res.json({message:"You mad a Bad Request, please check your parameters SELL"})
})

})




//XMR Routes

router.get('/xmr',(req,res,next)=>{
  res.render('user/xmr')
})


router.get('/trading/tickerxmr',(req,res,next)=>{

  return cryptoW.price('xmr', 'usd', 'bitfinex')
  .then((ticker)=>{
  
      res.json(ticker)
  
    }).catch((error)=>{
      console.log(error)
    })
  
  })

//Buy XMR

router.post('/trading/xmrbuy',(req,res,next)=>{
  User.findById(req.user._id).then(theUser=> {

    let sKey = encryptor.decrypt(theUser.secretKey);

    let x = sKey.toString()
  
let polo = new Poloniex(theUser.apikey,x,nonce=38);

let buying = {
  rate:req.body.rate ,
  amount:req.body.amount,
}

return polo.buy('BTC_XMR', buying.rate, buying.amount)

}).then((results)=>{

  res.json(results)

}).catch((error)=>{

  res.json({message:"You mad a Bad Request, please check your parameters BUY"})
})

})


//Selling XMR

router.post('/trading/xmrselling',(req,res,next)=>{
 
  User.findById(req.user._id).then(theUser=> {

    let sKey = encryptor.decrypt(theUser.secretKey);

    let x = sKey.toString()
  
let polo = new Poloniex(theUser.apikey,x,nonce=38);

let selling = {
  rate:req.body.rate ,
  amount:req.body.amount,
}

 return polo.sell('BTC_XMR', selling.rate, selling.amount)

}).then((results)=>{

  res.json(results)

  }).catch((error)=>{
  //Here is the handled error
  res.json({message:"You mad a Bad Request, please check your parameters SELL"})
})

})


//return Open Orders
router.get('/trading/openOrders',(req,res,next)=>{
 
  User.findById(req.user._id).then(theUser=> {

    let sKey = encryptor.decrypt(theUser.secretKey);

    let x = sKey.toString()
  
let polo = new Poloniex(theUser.apikey,x,nonce=38);


 return polo.returnOpenOrders('BTC_ETH')

}).then((results)=>{

  res.json(results)

  }).catch((error)=>{

  res.json({message:"You mad a Bad Request, please check your parameters SELL"})
})

})


module.exports = router;
