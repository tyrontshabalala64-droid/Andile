 let cart = JSON.parse(localStorage.getItem('finalAndileCart')) || [];

document.addEventListener('DOMContentLoaded', () => {
    updateCartUI();
});

function toggleCart() {
    document.getElementById('cartDrawer').classList.toggle('open');
    document.getElementById('cartOverlay').classList.toggle('open');
}

function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name: name, price: price, quantity: 1 });
    }
    saveCart();
    updateCartUI();
    toggleCart(); 
}

function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    updateCartUI();
}

function saveCart() {
    localStorage.setItem('finalAndileCart', JSON.stringify(cart));
}

function updateCartUI() {
    const container = document.getElementById('cartItemsContainer');
    const countElement = document.querySelector('.cart-count');
    const subtotalElement = document.getElementById('cartSubtotal');
    
    if (!container) return; 
    
    container.innerHTML = '';
    let total = 0;
    let totalItems = 0;

    if (cart.length === 0) {
        container.innerHTML = '<p style="text-align:center; color:#999; margin-top:50px;">Your bag is empty.</p>';
    } else {
        cart.forEach((item, index) => {
            total += item.price * item.quantity;
            totalItems += item.quantity;
            
            container.innerHTML += `
                <div class="cart-item">
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <p>Qty: ${item.quantity} x R ${item.price.toFixed(2)}</p>
                    </div>
                    <button class="remove-item" onclick="removeFromCart(${index})">Remove</button>
                </div>
            `;
        });
    }

    if(countElement) countElement.innerText = totalItems;
    if(subtotalElement) subtotalElement.innerText = `R ${total.toFixed(2)}`;
}

function checkoutWhatsApp() {
    if (cart.length === 0) {
        alert("Your cart is empty. Please add items before checking out.");
        return;
    }

    const phoneNumber = "27740255859";
    let total = 0;
    let message = "Hello Hair by Andz! I would like to place an order:\n\n";
    
    cart.forEach(item => {
        message += `• ${item.quantity}x ${item.name} (R ${item.price.toFixed(2)})\n`;
        total += item.price * item.quantity;
    });
    
    message += `\n*Subtotal: R ${total.toFixed(2)}*\n\n`;
    message += "Please let me know the next steps for payment and delivery.";

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
}