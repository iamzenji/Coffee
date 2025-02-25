let selectedCoffee = {};

function openModal(name) {
    document.getElementById('coffeeName').innerText = name;
    selectedCoffee = { name };
    updatePrice();
    const modal = new bootstrap.Modal(document.getElementById('coffeeModal'));
    modal.show();
}

function updatePrice() {
    const size = document.getElementById('size').value;
    let price = 100;
    if (size === 'Medium') price = 120;
    if (size === 'Large') price = 140;
    selectedCoffee.price = price;
}

function addToCartFromModal() {
    const size = document.getElementById('size').value;
    const grams = document.getElementById('grams').value;
    const sugar = document.getElementById('sugar').value;
    const temperature = document.getElementById('temperature').value;
    const { name, price } = selectedCoffee;

    const cart = document.getElementById('cart');
    const item = document.createElement('li');
    item.className = 'list-group-item';
    item.innerText = `${name} - ${size} - ${grams} grams - ${sugar} sugar - ${temperature} - ₱${price}`;
    cart.appendChild(item);

    updateTotal(price);
    const modal = bootstrap.Modal.getInstance(document.getElementById('coffeeModal'));
    modal.hide();
}

function updateTotal(amount) {
    const totalElement = document.getElementById('total');
    const currentTotal = parseInt(totalElement.innerText.replace('Total: ₱', ''));
    totalElement.innerText = `Total: ₱${currentTotal + amount}`;
}

function checkout() {
    if (document.getElementById('cart').children.length === 0) {
        Swal.fire({
            icon: 'warning',
            title: 'Cart is Empty',
            text: 'Please add items to your cart before checking out.'
        });
        return;
    }

    Swal.fire({
        icon: 'success',
        title: 'Checkout Successful!',
        text: 'Thank you for your purchase.',
        confirmButtonText: 'OK'
    }).then(() => {
        document.getElementById('cart').innerHTML = '';
        document.getElementById('total').innerText = 'Total: ₱0';
    });
}