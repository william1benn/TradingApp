window.onload = function(){

//Load Crypto Trade History
document.getElementById('historyBtn').onclick = ()=>{
  
  axios.get('/trading/history/btc',(req,res,next)=>{

    console.log("updated")

  }).then((callback)=>{

    axios.get('/trading/history/btceth')
    .then((results)=>{
      
      document.getElementById('tableHistory').innerHTML =" ";
      
      results.data.tradeHistory.forEach((items)=>{
    
        document.getElementById('tableHistory').innerHTML += 
        `<tr>
        <td>${items.amount}</td>
        <td>${items.date}</td>
        <td>${items.orderNumber}</td>
        <td>${items.type}</td>
        <td>${items.tradeID}</td>
        <tr>`
        
        
      })
    })

}).catch((error)=>{
      console.log(error)
    })
}


 
}//end