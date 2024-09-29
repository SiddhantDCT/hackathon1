// Initialize the cart and total variables
let cart = [];
let total = 0;

// Function to handle mouse movement for image rotation
document.querySelectorAll('.product-image').forEach((item) => {
    item.addEventListener('mousemove', function (e) {
        const width = this.offsetWidth;
        const height = this.offsetHeight;
        const centerX = this.offsetLeft + width / 2;
        const centerY = this.offsetTop + height / 2;
        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;
        const rotateX = (mouseY / height) * 30; // Adjust sensitivity
        const rotateY = (mouseX / width) * -30;

        this.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.1)`;
    });

    // Reset transform when mouse leaves the product image
    item.addEventListener('mouseleave', function () {
        this.style.transform = 'rotateX(0deg) scale(1)';
    });
});

// Function to add items to the cart
function addToCart(productName, price) {
    // Add product details to the cart array
    cart.push({ productName, price });

    // Update the total price
    total += price;

    // Store the total amount in localStorage
    localStorage.setItem("totalAmount", total);

    // Call the function to update the displayed cart items
    updateCart();
}

// Function to update the cart display
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    // Clear the existing cart items list to refresh it
    cartItems.innerHTML = '';

    // Loop through the cart items and add them to the cart display
    cart.forEach((item) => {
        const li = document.createElement('li');
        li.textContent = `${item.productName} - ₹${item.price}`; // Show item name and price in rupees
        cartItems.appendChild(li);
    });

    // Update the total price displayed in the cart
    cartTotal.textContent = `₹${total.toFixed(2)}`; // Display the total price in rupees
}

// Function to process the payment (for demonstration)
function processPayment() {
    // Alert the user with the total amount to be paid
    alert('Proceeding to payment. Total: ₹' + total.toFixed(2));

    // Optionally, clear cart and total after payment
    cart = [];
    total = 0;
    localStorage.removeItem("totalAmount"); // Clear total from localStorage
}

// Form submission handler
document.getElementById('checkout-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent the default form submission

    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const postalCode = document.getElementById('postal-code').value;

    // Simulate payment processing (replace this with actual payment integration)
    alert(`Processing payment for ${name} at ${address}, ${city}, ${postalCode}.`);
    
    // Here you would typically send the data to your backend to handle payment processing
});
