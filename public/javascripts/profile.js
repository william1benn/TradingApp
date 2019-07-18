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
        <td>${items.type}</td>
        <td>${items.tradeID}</td>
        <tr>`
        
        
      })
    })

}).catch((error)=>{
      console.log(error)
    })

  }
      axios.get('/trading/openOrders',(req,res,next)=>{
      
      }).then((callb)=>{
      
       // console.log(callb.data.length===0)

        if(callb.data.length===0){

        let opens = document.getElementById('openOrders');
        const bspan = document.createElement('span')
        bspan.innerText = "No Order Orders";
        opens.appendChild(bspan);

        }else{

console.log(callb)
          let opens = document.getElementById('openOrders');
          
          callb.data.forEach(orders=>{
            
            const bspan = document.createElement('div');
            bspan.innerHTML = `<span> Date:${orders.date}</span>`;
            opens.appendChild(bspan);
  
            const bcspan = document.createElement('div');
            bcspan.innerHTML = `<span> Amount:${orders.amount}</span>`;
            opens.appendChild(bcspan);
          
          })

        }
       
      
      }).catch((error)=>{
            console.log(error)
          })


}//end