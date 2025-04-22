// إضافة منتج للسلة
function addToCart(productId) {
    const product = sharedProducts.find(p => p.id == productId);
    if (product) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
    }
}

// تحديث عداد السلة في جميع الصفحات
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCountElements = document.querySelectorAll('.cart-count');
    
    cartCountElements.forEach(el => {
        el.textContent = cart.length;
    });
}