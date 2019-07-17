

let dropdown = false;

function toggleDropdown() {

  const dropdownEl = document.getElementById('dropdown');
  if(dropdown) {
    dropdownEl.classList.remove('visible')
    dropdown = false
  } else {
    dropdownEl.classList.add('visible')
    dropdown = true
    
  }

}


