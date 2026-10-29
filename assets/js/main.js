(function () {
  'use strict';
  const STORAGE_KEY = 'tuhung_inquiry_cart_v1';

  const Cart = {
    getItems: function () {
      try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; } catch (e) { return []; }
    },
    addItem: function (item) {
      let items = this.getItems();
      const exists = items.find(i => i.code === item.code);
      if (!exists) {
        items.push(item);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
        this.updateBadge();
        alert('Added "' + (item.title || item.code) + '" to Inquiry List');
      } else {
        alert('Item is already in your inquiry list');
      }
    },
    updateBadge: function () {
      const count = this.getItems().length;
      document.querySelectorAll('.inquiry-count').forEach(el => el.textContent = count);
    }
  };

  document.addEventListener('DOMContentLoaded', function () {
    Cart.updateBadge();

    // Языковой переключатель
    document.querySelectorAll('[data-lang-switch]').forEach(btn => {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        const targetLang = this.getAttribute('data-lang-switch');
        localStorage.setItem('th_lang', targetLang);
        const page = window.location.pathname.split('/').pop() || 'index.html';
        window.location.href = '../' + targetLang + '/' + page;
      });
    });

    // Кнопка добавления в корзину
    document.addEventListener('click', function (e) {
      if (e.target && e.target.classList.contains('add-inquiry-btn')) {
        const btn = e.target;
        Cart.addItem({
          code: btn.getAttribute('data-code'),
          title: btn.getAttribute('data-title'),
          priceUSD: btn.getAttribute('data-price')
        });
      }
    });
  });

  window.AtelierCart = Cart;
})();