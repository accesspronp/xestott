// Zest OTT cart system - keeps BUY NOW and adds a separate ADD TO CART button.
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
  }

  function addCartButtons() {
    document.querySelectorAll('.cartoon-card').forEach(card => {
      if (card.dataset.cartButtonAdded === 'true') return;

      const titleEl = card.querySelector('h3');
      const select = card.querySelector('select');
      const buyButton = card.querySelector('button');
      if (!titleEl || !select || !buyButton) return;

      const originalOnclick = buyButton.getAttribute('onclick') || '';
      const cartButton = document.createElement('button');
      cartButton.type = 'button';
      cartButton.textContent = 'ADD TO CART 🛒';
      cartButton.style.marginTop = '10px';
      cartButton.style.background = '#111';
      cartButton.style.color = '#fff';
      cartButton.style.boxShadow = '0 7px 0 #444';

      cartButton.addEventListener('click', function () {
        const selected = select.options[select.selectedIndex];
        const item = {
          product: titleEl.textContent.trim(),
          duration: selected.textContent.trim(),
          price: selected.getAttribute('data-price') || '0',
          type: getTypeFromOldOnclick(originalOnclick)
        };

        const cart = getCart();
        cart.push(item);
        saveCart(cart);
        alert(item.product + ' added to cart!');
      });

      buyButton.insertAdjacentElement('afterend', cartButton);
      card.dataset.cartButtonAdded = 'true';
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
    addCartButtons();
    setTimeout(addCartButtons, 500);
    setTimeout(addCartButtons, 1000);
  });
})();
