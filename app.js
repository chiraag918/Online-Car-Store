
//Constants used to render the cart items
const IMAGE_SRC={
  Lamborghini_Aventador_SVJ:"images/lamb.jpeg",
  Audi_R8:"images/R8.jpeg",
  BMW_M3:"images/M3.jpeg",
  Toyota_LC300_GR_Sport:"images/LC.jpeg",
  Mercedes_Benz_S600:"images/S.jpeg",
  Mercedes_Benz_G63_AMG:"images/G63.jpeg"
};


const BRAND_DISC={
  Lamborghini_Aventador_SVJ:1,
  Audi_R8:2,
  BMW_M3:2.5,
  Toyota_LC300_GR_Sport:0.5,
  Mercedes_Benz_S600:2.5,
  Mercedes_Benz_G63_AMG:1
};

let COMP_DISC={
  Lamborghini_Aventador_SVJ:0.1,
  Audi_R8:0.15,
  BMW_M3:0.3,
  Toyota_LC300_GR_Sport:0.1,
  Mercedes_Benz_S600:0.1,
  Mercedes_Benz_G63_AMG:0.1
};


//Query selectors for ham-burger animation & menu dropdown - when screen size small
const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.navbar__menu');

menu.addEventListener('click', function() {
  menu.classList.toggle('is-active')
  menuLinks.classList.toggle('active')
})

const cart_button = document.querySelector('.cart_button');
const cart_menu = document.querySelector('.cart_menu');

cart_button.addEventListener('click', function() {
  cart_button.classList.toggle('is-active')
  cart_menu.classList.toggle('active')
})

//DOM manipulation to shift between home & gallery sections - display property - changed
document.getElementById("explore").addEventListener("click", displayBlockMain);
document.getElementById("explore_2").addEventListener("click", displayBlockMain);

function displayBlockMain() {
  document.getElementById("main").style.display='none';
  document.getElementById("images").style.display='flex';
  document.getElementById("button_1").style.borderBottom='5px solid #131313';
  document.getElementById("button_2").style.borderBottom='5px solid red';
}

document.getElementById("home").addEventListener("click", displayBlockExplore);

function displayBlockExplore() {
  document.getElementById("main").style.display='flex';
  document.getElementById("images").style.display='none';
  document.getElementById("button_1").style.borderBottom='5px solid red'; 
  document.getElementById("button_2").style.borderBottom='5px solid #131313';
}


  //event listener on remove button on cart items
  var removeCartItemButtons = document.getElementsByClassName('btn-remove')
  for (var i = 0; i < removeCartItemButtons.length; i++) {
      var button = removeCartItemButtons[i]
      button.addEventListener('click', removeCartItem)
  }
 
  //event listener on cart quantity input box on cart items
  var quantityInputs = document.getElementsByClassName('cart-quantity-input')
  for (var i = 0; i < quantityInputs.length; i++) {
      var input = quantityInputs[i]
      input.addEventListener('change', quantityChanged)
  }

  //event listener on cart quantity input box on gallery page for each item
  var quantityInputsPage = document.getElementsByClassName('cart-quantity-input-page')
  for (var i = 0; i < quantityInputsPage.length; i++) {
      var input = quantityInputsPage[i]
      input.addEventListener('change', quantityChangedPage)
  }

  //event listener on add to cart button on gallery page for each item
  var addToCartButtons = document.getElementsByClassName('shop-item-button')
  console.log(addToCartButtons)
  for (var i = 0; i < addToCartButtons.length; i++) {
      var button = addToCartButtons[i]
      
      button.addEventListener('click', addToCartClicked)
  }

  //event listener on increment button for qty on gallery page for each item
  var incrementCartButton = document.getElementsByClassName('button-range-increment')
  for (var i = 0; i < incrementCartButton.length; i++) {
      var button = incrementCartButton[i]
      
      button.addEventListener('click', incrementButtonClicked)
  }

  function incrementButtonClicked(event){
    var buttonClicked = event.target;
    console.log(buttonClicked);

    var input = buttonClicked.parentElement.getElementsByClassName("cart-quantity-input-page")[0]
    input.value++;

    var carTitle = buttonClicked.parentElement.parentElement.getElementsByClassName("shop-item-title")[0].innerText;
    
    updateCartQty(carTitle, input.value);

    updateCartTotal();

  }

//event listener on decrement button for qty on gallery page for each item
var decrementCartButton = document.getElementsByClassName('button-range-decrement')
for (var i = 0; i < decrementCartButton.length; i++) {
  var button = decrementCartButton[i]

  button.addEventListener('click', decrementButtonClicked)
}

function decrementButtonClicked(event) {
  var buttonClicked = event.target;
  console.log(buttonClicked);

  var cartCountElement = buttonClicked.parentElement.getElementsByClassName("cart-quantity-input-page")[0];

  if (cartCountElement.value > 1) {
    cartCountElement.value--;

    var carTitle = buttonClicked.parentElement.parentElement.getElementsByClassName("shop-item-title")[0].innerText;

    updateCartQty(carTitle, cartCountElement.value);

    updateCartTotal();
  }
  else {
    var directParent = buttonClicked.parentElement;

    directParent.style.display = "none";
    directParent.parentElement.getElementsByClassName("shop-item-button")[0].style.display = "block";

    var carTitle = directParent.parentElement.getElementsByClassName("shop-item-title")[0].innerText;

    removeCartItemByName(carTitle);
  }
}

//event listener on purchase button on the cart menu 
document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)


function purchaseClicked() {
  alert('Payment Successful')
  var cartItems = document.getElementsByClassName('cart-items')[0]
  while (cartItems.hasChildNodes()) {
      cartItems.removeChild(cartItems.firstChild)
  }
  updateCartTotal()
}

//Helper Functions

//To remove cart item row on cart menu
function removeCartItemByName(carTitle){

      var cartItemElement = searchCartItem(carTitle);
      cartItemElement.parentElement.parentElement.remove();
      updateCartTotal();
}
 
//To search for cart element on cart menu based on title 
function searchCartItem(carTitle){
  var allCartItems = document.getElementsByClassName("cart-row");

  for(let i=1;i<allCartItems.length;i++)
  {
    var cartItemElement = allCartItems[i].getElementsByClassName("cart-item-title")[0];
    if(cartItemElement.innerText==carTitle)
       return cartItemElement;
  }
}


//To remove cart item row on cart menu from the gallery page - when qty range is decreased further 1
function removeCartItem(event) {
  var buttonClicked = event.target
  var carTitle = buttonClicked.parentElement.parentElement.getElementsByClassName("cart-item-title")[0].innerText;
  console.log(carTitle)
  removeCartRange(carTitle);
  buttonClicked.parentElement.parentElement.remove()
  updateCartTotal()
}

//Toggles between add cart button and qty range on gallery page
function removeCartRange(carTitle)
{
  itemElement = searchCarItem(carTitle);

  itemElement.getElementsByClassName("cart-quantity-input-page")[0].value=1;
  itemElement.getElementsByClassName("shop-item-range")[0].style.display="none";
  itemElement.getElementsByClassName("shop-item-button")[0].style.display="block";

}

//To search for cart element on gallery page
function searchCarItem(carTitle)
{
  allCarItems = document.getElementsByClassName("car_info");
  console.log(allCarItems)

  for(let i=0;i<allCarItems.length;i++)
  {
    console.log(allCarItems[i].getElementsByClassName("shop-item-title")[0]);
    if(allCarItems[i].getElementsByClassName("shop-item-title")[0].innerText==carTitle)
       return allCarItems[i];
  }
 
}

//Callback on qty input box on cart item event handler 
function quantityChanged(event) {
  var input = event.target
  if (isNaN(input.value) || input.value <= 0) {
      input.value = 1
  }
  updateCartTotal()

  var carTitle=input.parentElement.parentElement.getElementsByClassName("cart-item-title")[0].innerText;
  updatePageQty(carTitle, input.value);
}

//To sync value with qty input box on gallery page when quantityChanged is invoked
function updatePageQty(carTitle, value)
{
  var itemElement = searchCarItem(carTitle);
  itemElement.getElementsByClassName("cart-quantity-input-page")[0].value=value;
}

//Callback on qty input box on gallery page event handler
function quantityChangedPage(event) {
  var input = event.target
  if (isNaN(input.value) || input.value <= 0) {
      input.value = 1
  }

  var carTitle=input.parentElement.parentElement.getElementsByClassName("shop-item-title")[0].innerText;
  updateCartQty(carTitle, input.value);

  updateCartTotal()
}

//To sync value with qty input box on cart item when quantityChangedPage is invoked
function updateCartQty(carTitle, value)
{
  var itemElement = searchCartItem(carTitle);
  itemElement.parentElement.parentElement.getElementsByClassName("cart-quantity-input")[0].value=value;
}

//Callback to add to cart button event handler
function addToCartClicked(event) {
  var button = event.target
  button.style.display="none";
  var carinfo = button.parentElement;
  carinfo.getElementsByClassName('shop-item-range')[0].style.display="block";
  var shopItem = button.parentElement.parentElement
  var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
  var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText


  addItemToCart(title, price)
  updateCartTotal()
}

//Function to add cart element onto the cart menu
function addItemToCart(title, price) 
  {var cartRow = document.createElement('div')
  cartRow.classList.add('cart-row')
  var cartItems = document.getElementsByClassName('cart-items')[0]
  var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
 
  let arr=title.split(' ');
  let keyImage=arr.join('_');

  console.log(keyImage);
  console.log(IMAGE_SRC[keyImage]);
  
  for (var i = 0; i < cartItemNames.length; i++) {
      if (cartItemNames[i].innerText == title) {
          alert('This item is already added to the cart')
          return
      }
  }
  var cartRowContents = `
      <div class="cart-item cart-column">
          <img class="cart-item-image" src=${IMAGE_SRC[keyImage]} width="100" height="100">
          <span class="cart-item-title">${title}</span>
      </div>
      <span class="cart-price cart-column">${price}</span>
      <span class="cart-brand-disc cart-column">${BRAND_DISC[keyImage]}%</span>
      <span class="cart-company-disc cart-column">${COMP_DISC[keyImage]}%</span>
      <div class="cart-quantity cart-column">
          <input class="cart-quantity-input" type="number" value="1">
          <button class="btn btn-remove" type="button">X</button>
      </div>`
  cartRow.innerHTML = cartRowContents
  cartItems.append(cartRow)
  cartRow.getElementsByClassName('btn-remove')[0].addEventListener('click', removeCartItem)
  cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

//Function to update the total value on cart menu
function updateCartTotal() {
  var cartItemContainer = document.getElementsByClassName('cart-items')[0]
  var cartRows = cartItemContainer.getElementsByClassName('cart-row')
  var total = 0
  var totalQuant = 0;
  for (var i = 0; i < cartRows.length; i++) {
      var cartRow = cartRows[i]
      var priceElement = cartRow.getElementsByClassName('cart-price')[0]
      var brandDiscElement = cartRow.getElementsByClassName('cart-brand-disc')[0]
      var compDiscElement = cartRow.getElementsByClassName('cart-company-disc')[0]
      var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
      var price = parseFloat(priceElement.innerText.replace('$', ''))
      var brandDiscount = parseFloat(brandDiscElement.innerText.replace('%', ''))/100
      var compDiscount = parseFloat(compDiscElement.innerText.replace('%', ''))/100
      var quantity = quantityElement.value
      var brandPrice = price*(1-brandDiscount)
      var compPrice = brandPrice*(1-compDiscount)
      total = total + (compPrice * quantity) 
      totalQuant=parseFloat(totalQuant)+parseFloat(quantity);
  }
  
  var cartCount = document.getElementsByClassName('cart_count')[0];
  cartCount.innerText = totalQuant;
  if(totalQuant==0)
    cartCount.style.visibility="hidden";
  else
    cartCount.style.visibility="visible";
  total = Math.round(total * 100) / 100
  document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}


