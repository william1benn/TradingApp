// let userName = document.getElementById('name');
// let pass = document.getElementById('password');
// const loginBtn = document.getElementById("loginBtn");
// const dropdownEl = document.getElementById('dropdown');


// //Login 

// document.getElementById('loginapp').onsubmit = function(e){
//   e.preventDefault();
//   axios.post('http://localhost:4000/login', {

//     username: userName.value,
//     password: pass.value,

//   }).then(()=>{
//       const form = document.getElementById('auth-form');
//      // const loginTrue = document.getElementsByClassName("loggedIn");
//       //const loggedOut = document.getElementsByClassName('loggedOut');

//       if(!form.classList.contains('hide-form')) {
//         form.classList.add('hide-form')
//       }

//       //Doesnt Work
//     //   for(let i =0; i < loginTrue.length; i++){
//     //     for(let z = 0; z < loggedOut.length; z++){
//     //  if(loginTrue[i].classList.contains('trueLogin')){
//     //     loginTrue[i].classList.remove('trueLogin')
//     //     loggedOut[z].classList.add('trueLogin');
//     //  }
//     // }
//     //     console.log('inefie')
//     //  }
     
      
//       //Get the deposit address
  
//       axios.get('http://localhost:4000/trading/deposit')
//       .then((results)=>{

//         // let bdiv = document.getElementById('deposit');
//         // const bspan = document.createElement('span');
//         // bspan.innerText = results.data.ETH;
//         // bdiv.appendChild(bspan);
    
//         // let div = document.getElementById("xmrdeposit");
//         // const span = document.createElement('span');
//         // span.innerText = results.data.XMR;
//         // div.appendChild(span);


//       }).then(()=>{
//         axios.get('http://localhost:4000/trading/accounts')
//         .then((results)=>{
      
      
//           document.getElementById('btc').innerText = results.data.BTC;
//           document.getElementById('xmrwallet').innerText = results.data.XMR;
          
       
//         })
//       })

//   }).catch((error)=>{
//     console.log(error)
//   })

//   dropdownEl.classList.remove('visible')
// }


// //logout
// document.getElementById('logoutelement').onclick = function(){

//   axios.post('http://localhost:4000/logout')

// }