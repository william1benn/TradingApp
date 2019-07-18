let userName = document.getElementById('name');
let pass = document.getElementById('password');
const loginBtn = document.getElementById("loginBtn");
const dropdownEl = document.getElementById('dropdown');
const blockbtnsign = document.querySelector('.signup-btn-block');


//Login 

document.getElementById('loginapp').onsubmit = function(e){
  e.preventDefault();
  axios.post('http://localhost:4000/login', {

    username: userName.value,
    password: pass.value,

  }).then(()=>{

    console.log('test');

    $('#loginID').toggleClass('trueLogin');
    $('#registerID').toggleClass('trueLogin');
    $("#profileID").toggleClass('trueLogin');
    $('#logoutelement').toggleClass('trueLogin');
    // $(".loggedIn").removeClass('trueLogin');
    // $(".loggin").removeClass('trueLogin');


      const form = document.getElementById('auth-form');
     
      if(!form.classList.contains('hide-form')) {
        form.classList.add('hide-form')
      }

    
     
      
      //Get the deposit address
  
      axios.get('http://localhost:4000/trading/deposit')
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
        
         

      }).then(()=>{
        axios.get('http://localhost:4000/trading/accounts')
        .then((results)=>{
      
          if(window.location.pathname === '/xmr'){
          let abdiv = document.getElementById('btc');
          const abspan = document.createElement('span');
          abspan.innerText = results.data.BTC;
          abdiv.appendChild(abspan);
      
          let xdiv = document.getElementById("xmrwallet");
          const xspan = document.createElement('span');
          xspan.innerText = results.data.XMR;
          xdiv.appendChild(xspan);
      
          }else if(window.location.pathname === '/trading'){
          
              let bdiv = document.getElementById('btc');
              const bspan = document.createElement('span');
              bspan.innerText = results.data.BTC;
              bdiv.appendChild(bspan);
          
              let zdiv = document.getElementById("ethwallet");
              const zspan = document.createElement('span');
              zspan.innerText = results.data.ETH;
              zdiv.appendChild(zspan);
          }
       
        })
      })

  }).catch((error)=>{
    console.log(error)
  })

  dropdownEl.classList.remove('visible')
}

document.getElementById('signup-block').onsubmit = () => {
  axios.get('http://localhost:4000/signup')
}

//logout
// document.getElementById('logoutelement').onclick = function(){

//   axios.post('http://localhost:4000/logout')

// }
