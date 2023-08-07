let removeListItems = document.getElementsByClassName('btn-danger')
const cartItems = document.querySelector('.cart-items');
// console.log(removeListItems)
for (let i = 0 ; i < removeListItems.length ; i ++){
    let listItem = removeListItems[i];
    listItem.addEventListener('click',() =>{
        
        let  productContainer = listItem.parentElement.parentElement
        productContainer.remove();
        updateCartTotal();
    })
}

function updateCartTotal() {
    let cartItemContainer = document.getElementsByClassName('cart-items')[0];
    // console.log(cartItemContainer)
    let cartItemRow =cartItemContainer.getElementsByClassName('cart-row')
    // console.log(cartItemRow)
    let total = 0 

    for(let i = 0 ; i < cartItemRow.length ; i++) {
        let rowItem = cartItemRow[i];
        let priceElement = rowItem.getElementsByClassName('cart-price')[0];
        let quantityElement = rowItem.getElementsByClassName('cart-quantity-input')[0];
    //    console.log(priceElement ,quantityElement)
        let price = parseFloat(priceElement.innerText.replace('$',''));

        let quantity = quantityElement.value;
        total = total+ (price* quantity)
        // Math.round(total)

       
    }
    total = total.toFixed(2)
    document.getElementsByClassName('cart-total-price')[0].innerText = total
}

// Add event listeners to all "ADD TO CART" buttons
const addToCartButtons = document.querySelectorAll('.shop-item-button');
addToCartButtons.forEach(button => {
    button.addEventListener('click', addToCartClicked);
});

function addToCartClicked(event) {
    const button = event.target;
    const shopItem = button.parentElement.parentElement;
    // console.log(shopItem)
    const title = shopItem.querySelector('.shop-item-title').innerText;
    
    const price = shopItem.querySelector('.shop-item-price').innerText;
    const imageSrc = shopItem.querySelector('.shop-item-image').src;
    addItemToCart(title, price , imageSrc);
}

function addItemToCart(title, price, imageSrc) {
    
    const cartRow = document.createElement('div');
    cartRow.classList.add('cart-row');

    const cartItems = document.querySelector('.cart-items');
    const cartItemNames = cartItems.getElementsByClassName('cart-item-title');
    for (let i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText === title) {
            alert('This item is already added to the cart.');
            return;
        }
    }

    const cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>
    `;

    cartRow.innerHTML = cartRowContents;
    cartItems.append(cartRow);

    // Attach event listener to the remove button in the newly added row
    const removeButton = cartRow.querySelector('.btn-danger');
    removeButton.addEventListener('click', removeCartItem);

    // Recalculate the total price of the cart
    updateCartTotal();
}
function removeCartItem(event) {
    const buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal();
}
function resetState(){
    while(cartItems.firstChild){  // ☝️  // this loop is for ..as long as there is firstchild element inside cartItems
       cartItems.removeChild(cartItems.firstChild);
      
    
    }
    const totalPrice =document.querySelector('.cart-total');
    // console.log(totalPrice)
    total1 = totalPrice.getElementsByClassName('cart-total-price')[0]
    // console.log(total1)
    total1.innerText = '$' + 0;

}
resetState();