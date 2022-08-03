const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.navbar__menu');

document.getElementById("explore").addEventListener("click", displayBlockMain);
document.getElementById("explore_2").addEventListener("click", displayBlockMain);

function displayBlockMain() {
  document.getElementById("main").style.display='none';
  document.getElementById("images").style.display='flex';
}

document.getElementById("home").addEventListener("click", displayBlockExplore);

function displayBlockExplore() {
  document.getElementById("main").style.display='flex';
  document.getElementById("images").style.display='none';
}


menu.addEventListener('click', function() {
    menu.classList.toggle('is-active')
    menuLinks.classList.toggle('active')
})
