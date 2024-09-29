// Function to display cart items in the cart page or popup
function displayCartItems() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.getElementById('cartItemsContainer');
    cartContainer.innerHTML = ''; // Clear the container before rendering

    cartItems.forEach(item => {
        const cartItemElement = document.createElement('div');
        cartItemElement.className = 'cart-item';
        cartItemElement.innerHTML = `
            <div class="item-name">${item.name}</div>
            <div class="item-quantity">
                <button class="decrease-quantity" onclick="changeQuantity(${item.id}, -1)">-</button>
                <span>${item.quantity}</span>
                <button class="increase-quantity" onclick="changeQuantity(${item.id}, 1)">+</button>
            </div>
            <div class="item-price">$${(item.price * item.quantity).toFixed(2)}</div>
            <button class="remove-item" onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cartContainer.appendChild(cartItemElement);
    });

    updateCartTotal();
}

// Function to change the quantity of an item in the cart
function changeQuantity(itemId, change) {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const item = cartItems.find(item => item.id === itemId);

    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(itemId); // Remove if quantity becomes zero or negative
        } else {
            localStorage.setItem('cart', JSON.stringify(cartItems));
            updateCartCount();
            displayCartItems();
        }
    }
}

// Function to remove an item from the cart
function removeFromCart(itemId) {
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    cartItems = cartItems.filter(item => item.id !== itemId);

    localStorage.setItem('cart', JSON.stringify(cartItems));
    updateCartCount();
    displayCartItems();
}

// Function to update the total price in the cart
function updateCartTotal() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    document.getElementById('totalPrice').innerText = `$${totalPrice.toFixed(2)}`;
}

// Call displayCartItems on page load if cart is being displayed
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('cartItemsContainer')) {
        displayCartItems();
    }
});
