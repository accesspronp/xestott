// Zest OTT cart system - converts BUY NOW buttons into Add to Cart buttons without changing product cards.
(function () {
  function getCart() {
    return JSON.parse(localStorage.getItem('zestCart') || '[]');
  }

  function saveCart(cart) {
    localStorage.setItem('zestCart', JSON.stringify(cart));
    updateCartCount();
  }

  function updateCartCount() {
    const cart = getCart();
    document.querySelectorAll('[data-cart-count]').forEach(el => {
      el.textContent = cart.length;
    });
  }

  function addCartLink() {
    const nav = document.querySelector('.cartoon-links');
    if (!nav || document.querySelector('[data-cart-link]')) return;

    const cartLink = document.createElement('a');
    cartLink.href = 'cart.html';
    cartLink.setAttribute('data-cart-link', 'true');
    cartLink.innerHTML = 'Cart 🛒 (<span data-cart-count>0</span>)';
    nav.insertBefore(cartLink, nav.firstChild);

    const ordersLink = document.createElement('a');
    ordersLink.href = 'orders.html';
    ordersLink.textContent = 'My Orders';
    nav.insertBefore(ordersLink, cartLink.nextSibling);

    const adminLink = document.createElement('a');
    adminLink.href = 'admin.html';
    adminLink.textContent = 'Admin';
    nav.appendChild(adminLink);
  }

  function convertButtons() {
    document.querySelectorAll('.cartoon-card button').forEach(button => {
      if (button.dataset.cartReady === 'true') return;

      const card = button.closest('.cartoon-card');
      if (!card) return;

      const titleEl = card.querySelector('h3');
      const select = card.querySelector('select');
      if (!titleEl || !select) return;

      button.dataset.cartReady = 'true';
      button.textContent = 'ADD TO CART 🛒';
      button.onclick = function () {
        const selected = select.options[select.selectedIndex];
        const item = {
          product: titleEl.textContent.trim(),
          duration: selected.textContent.trim(),
          price: selected.getAttribute('data-price') || '0',
          type: getTypeFromOldOnclick(button.getAttribute('onclick') || '')
        };

        const cart = getCart();
        cart.push(item);
        saveCart(cart);
        alert(item.product + ' added to cart!');
      };
    });
  }

  function getTypeFromOldOnclick(text) {
    if (text.includes("'login'")) return 'login';
    if (text.includes("'email'")) return 'email';
    return 'normal';
  }

  window.addEventListener('DOMContentLoaded', () => {
    addCartLink();
    updateCartCount();
    convertButtons();

    // Existing page clones cards after DOMContentLoaded, so run once more after a short delay.
    setTimeout(convertButtons, 500);
  });
})();
