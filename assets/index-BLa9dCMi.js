(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const c of n.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&i(c)}).observe(document,{childList:!0,subtree:!0});function a(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerPolicy&&(n.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?n.credentials="include":r.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(r){if(r.ep)return;r.ep=!0;const n=a(r);fetch(r.href,n)}})();const x=[{id:1,name:"Световой меч Дарт Вейдера",category:"lightsabers",price:15e3,image:"🔴",stock:5,popularity:95},{id:2,name:"Световой меч Люка Скайвокера",category:"lightsabers",price:12e3,image:"🟢",stock:12,popularity:90},{id:3,name:"Световой меч Мейс Винду",category:"lightsabers",price:14e3,image:"🔵",stock:3,popularity:75},{id:4,name:"Световой меч Кайло Рена",category:"lightsabers",price:16e3,image:"🔴",stock:8,popularity:85},{id:5,name:'Футболка "Эмблема Альянса"',category:"clothing",price:2500,image:"👕",stock:45,popularity:80},{id:6,name:'Худи "Империя"',category:"clothing",price:4500,image:"🧥",stock:20,popularity:70},{id:7,name:'Футболка "Дарт Вейдер"',category:"clothing",price:2800,image:"👕",stock:60,popularity:92},{id:8,name:'Куртка "Пилот X-Wing"',category:"clothing",price:8e3,image:"🧥",stock:7,popularity:65},{id:9,name:"Статуэтка R2-D2",category:"merch",price:5500,image:"🤖",stock:15,popularity:88},{id:10,name:"Фигурка Бобы Фетта",category:"merch",price:4200,image:"🎭",stock:10,popularity:82},{id:11,name:'Брелок "Молот Галактики"',category:"merch",price:800,image:"🔑",stock:100,popularity:60},{id:12,name:"Маска Дарт Вейдера",category:"merch",price:3500,image:"🎭",stock:25,popularity:78},{id:13,name:'Набор значков "Звёздные войны"',category:"merch",price:1200,image:"🏅",stock:50,popularity:55},{id:14,name:'Зонт "Звезда Смерти"',category:"merch",price:1800,image:"☂️",stock:30,popularity:72},{id:15,name:'Термокружка "Люк Скайвокер"',category:"merch",price:950,image:"☕",stock:40,popularity:68},{id:16,name:'Рюкзак "Флотан"',category:"merch",price:6500,image:"🎒",stock:6,popularity:50}],v={lightsabers:"Световые мечи",clothing:"Одежда",merch:"Мерч"},k={email:"qwe@qwe.ru",password:"qweQWE"},D="SW10",h=.1,M="1111111111111111";function s(){const e=localStorage.getItem("cart");return e?JSON.parse(e):[]}function b(e){localStorage.setItem("cart",JSON.stringify(e))}function U(e){const t=s(),a=t.find(i=>i.product.id===e);if(a)a.quantity++;else{const i=x.find(r=>r.id===e);i&&t.push({product:i,quantity:1})}return b(t),g(),t}function C(e){let t=s();return t=t.filter(a=>a.product.id!==e),b(t),g(),t}function $(e,t){const a=s(),i=a.find(r=>r.product.id===e);if(i){if(t<=0)return C(e);i.quantity=t,b(a),g()}return a}function H(){localStorage.removeItem("cart"),g()}function q(){return s().reduce((t,a)=>t+a.product.price*a.quantity,0)}function E(){return s().reduce((t,a)=>t+a.quantity,0)}function g(){const e=E(),t=document.getElementById("cart-count");t&&(t.textContent=e.toString())}function w(){const e=localStorage.getItem("user");return e?JSON.parse(e):null}function P(e){e?localStorage.setItem("user",JSON.stringify(e)):localStorage.removeItem("user"),A()}function S(e,t){return e===k.email&&t===k.password?(P({email:e,isLoggedIn:!0}),!0):!1}function O(){P(null)}function A(){const e=w(),t=document.getElementById("auth-btn");t&&(e?.isLoggedIn?(t.textContent="Выход",t.classList.add("logged-in")):(t.textContent="Вход",t.classList.remove("logged-in")))}function I(){const e=localStorage.getItem("reviews");return e?JSON.parse(e):[]}function F(e){const t=I(),a={...e,id:Date.now(),date:new Date().toLocaleDateString("ru-RU")};t.push(a),localStorage.setItem("reviews",JSON.stringify(t))}function L(){const e=localStorage.getItem("orders");return e?JSON.parse(e):[]}function J(e){const t=L();t.push(e),localStorage.setItem("orders",JSON.stringify(t))}function j(e){return e.toUpperCase()===D?{valid:!0,discount:h,message:"Промокод применён! Скидка 10%"}:{valid:!1,discount:0,message:"Неверный промокод"}}let l="",o={category:"",minPrice:0,maxPrice:2e4,sortBy:"popularity"},u=!1,f=0;function _(e){const t=document.querySelector(".custom-alert-overlay");t&&t.remove();const a=document.querySelector(".custom-alert");a&&a.remove();const i=document.createElement("div");i.className="custom-alert-overlay";const r=document.createElement("div");r.className="custom-alert",r.textContent=e,document.body.appendChild(i),document.body.appendChild(r),setTimeout(()=>{i.remove(),r.remove()},2e3),i.addEventListener("click",()=>{i.remove(),r.remove()})}function W(){g(),A(),B(),Q(),window.addEventListener("hashchange",B)}function B(){const e=window.location.hash.slice(1)||"/",t=document.getElementById("main-content");t&&(e==="/"||e===""?(l="home",K(t)):e==="/catalog"?(l="catalog",p(t)):e==="/cart"?(l="cart",m(t)):e==="/checkout"?(l="checkout",te(t)):e==="/reviews"?(l="reviews",T(t)):e==="/success"?(l="success",re(t)):e==="/failure"?(l="failure",ie(t)):e==="/profile"&&(l="profile",R(t)))}function Q(){document.getElementById("auth-btn")?.addEventListener("click",()=>{w()?.isLoggedIn?O():N()}),document.getElementById("close-auth")?.addEventListener("click",y),document.getElementById("auth-modal")?.addEventListener("click",e=>{e.target===e.currentTarget&&y()}),document.getElementById("auth-form")?.addEventListener("submit",G),document.getElementById("auth-toggle-link")?.addEventListener("click",z),document.querySelector(".cart-link")?.addEventListener("click",e=>{e.preventDefault(),window.location.hash="#/cart"})}function N(){document.getElementById("auth-modal")?.classList.add("active")}function y(){if(document.getElementById("auth-modal")?.classList.remove("active"),document.getElementById("auth-form")?.reset(),l==="profile"){const e=document.getElementById("main-content");e&&R(e)}}let d=!0;function z(e){e.preventDefault(),d=!d,document.getElementById("auth-title").textContent=d?"Вход":"Регистрация",document.getElementById("auth-submit").textContent=d?"Войти":"Регистрация",document.getElementById("auth-toggle-text").textContent=d?"Нет аккаунта?":"Есть аккаунт?",document.getElementById("auth-toggle-link").textContent=d?"Регистрация":"Вход"}function G(e){e.preventDefault();const t=document.getElementById("email").value,a=document.getElementById("password").value;if(!t||!a){alert("Пожалуйста, заполните все поля");return}d?S(t,a)?y():alert("Неверные учетные данные"):(S(t,a),y())}function K(e){e.innerHTML=`
    <section class="hero">
      <h1>Добро пожаловать в Galaxy Store</h1>
      <p>Магазин лучшей атрибутики по вселенной Звёздных войн. Световые мечи, одежда, фигурки и многое другое!</p>
      <a href="#/catalog" class="btn btn-primary">Перейти в каталог</a>
    </section>
    <section class="features">
      <div class="feature-card" onclick="window.location.hash='#/catalog'; document.getElementById('category-filter').value='lightsabers'; setTimeout(() => document.querySelector('#category-filter').dispatchEvent(new Event('change')), 100)" style="cursor: pointer;">
        <div class="feature-icon">⚔️</div>
        <h3>Световые мечи</h3>
        <p>Оригинальные световые мечи из любимых фильмов</p>
      </div>
      <div class="feature-card" onclick="window.location.hash='#/catalog'; document.getElementById('category-filter').value='clothing'; setTimeout(() => document.querySelector('#category-filter').dispatchEvent(new Event('change')), 100)" style="cursor: pointer;">
        <div class="feature-icon">👕</div>
        <h3>Одежда</h3>
        <p>Футболки, худи и куртки с символикой галактики</p>
      </div>
      <div class="feature-card" onclick="window.location.hash='#/catalog'; document.getElementById('category-filter').value='merch'; setTimeout(() => document.querySelector('#category-filter').dispatchEvent(new Event('change')), 100)" style="cursor: pointer;">
        <div class="feature-icon">🎭</div>
        <h3>Мерч</h3>
        <p>Фигурки, брелоки и аксессуары</p>
      </div>
    </section>
  `}function p(e){const t=V();e.innerHTML=`
    <h1>Каталог товаров</h1>
    <div class="catalog-filters">
      <div class="filters-row">
        <div class="filter-group">
          <label for="category-filter">Категория</label>
          <select id="category-filter">
            <option value="">Все категории</option>
            <option value="lightsabers">${v.lightsabers}</option>
            <option value="clothing">${v.clothing}</option>
            <option value="merch">${v.merch}</option>
          </select>
        </div>
        <div class="filter-group">
          <label for="min-price">Цена от</label>
          <input type="number" id="min-price" value="0" min="0" max="20000">
        </div>
        <div class="filter-group">
          <label for="max-price">Цена до</label>
          <input type="number" id="max-price" value="20000" min="0" max="20000">
        </div>
        <div class="filter-group">
          <label for="sort-filter">Сортировка</label>
          <select id="sort-filter">
            <option value="popularity">По популярности</option>
            <option value="stock">По остатку</option>
          </select>
        </div>
      </div>
    </div>
    <div class="products-grid" id="products-grid">
      ${t.map(a=>X(a)).join("")}
    </div>
  `,Y()}function V(){let e=[...x];return o.category&&(e=e.filter(t=>t.category===o.category)),e=e.filter(t=>t.price>=o.minPrice&&t.price<=o.maxPrice),o.sortBy==="popularity"?e.sort((t,a)=>a.popularity-t.popularity):e.sort((t,a)=>t.stock-a.stock),e}function X(e){const t=e.stock<=5?"low":e.stock<=20?"medium":"high",a=e.stock<=5?"Мало":e.stock<=20?"Достаточно":"В наличии";return`
    <div class="product-card" data-id="${e.id}">
      <div class="product-image">${e.image}</div>
      <div class="product-info">
        <h3 class="product-name">${e.name}</h3>
        <p class="product-category">${v[e.category]}</p>
        <p class="product-stock ${t}">${a} (${e.stock} шт.)</p>
        <p class="product-price">${e.price.toLocaleString("ru-RU")} ₽</p>
        <button class="btn-add-cart" data-id="${e.id}">В корзину</button>
      </div>
    </div>
  `}function Y(){const e=document.getElementById("category-filter"),t=document.getElementById("min-price"),a=document.getElementById("max-price"),i=document.getElementById("sort-filter");e.value=o.category,t.value=o.minPrice.toString(),a.value=o.maxPrice.toString(),i.value=o.sortBy,e.addEventListener("change",()=>{o.category=e.value,p(document.getElementById("main-content"))}),t.addEventListener("change",()=>{o.minPrice=parseInt(t.value)||0,p(document.getElementById("main-content"))}),a.addEventListener("change",()=>{o.maxPrice=parseInt(a.value)||2e4,p(document.getElementById("main-content"))}),i.addEventListener("change",()=>{o.sortBy=i.value,p(document.getElementById("main-content"))}),document.querySelectorAll(".btn-add-cart").forEach(r=>{r.addEventListener("click",n=>{const c=parseInt(n.target.getAttribute("data-id"));U(c),_("Товар добавлен в корзину!")})})}function m(e){const t=s();if(t.length===0){e.innerHTML=`
      <h1>Корзина</h1>
      <div class="cart-empty">
        <p>Корзина пуста</p>
        <a href="#/catalog" class="btn btn-primary">Перейти в каталог</a>
      </div>
    `;return}const a=q(),i=u?a*h:0,r=a-i;e.innerHTML=`
    <h1>Корзина</h1>
    <div class="cart-page">
      <div class="cart-items">
        ${t.map(n=>Z(n)).join("")}
      </div>
      <div class="cart-summary">
        <h3>Итого</h3>
        <div class="summary-row">
          <span>Товары (${E()}):</span>
          <span>${a.toLocaleString("ru-RU")} ₽</span>
        </div>
        ${u?`
          <div class="summary-row">
            <span>Скидка:</span>
            <span>-${i.toLocaleString("ru-RU")} ₽</span>
          </div>
        `:""}
        <div class="summary-row summary-total">
          <span>К оплате:</span>
          <span>${r.toLocaleString("ru-RU")} ₽</span>
        </div>
        <div class="promo-input-group">
          <input type="text" id="promo-input" placeholder="Промокод">
          <button id="apply-promo">Применить</button>
        </div>
        <p class="promo-message" id="promo-message"></p>
        <a href="#/checkout" class="btn-checkout">Оформить заказ</a>
      </div>
    </div>
  `,ee(t)}function Z(e){return`
    <div class="cart-item" data-id="${e.product.id}">
      <div class="cart-item-image">${e.product.image}</div>
      <div class="cart-item-info">
        <h4 class="cart-item-name">${e.product.name}</h4>
        <p class="cart-item-price">${e.product.price.toLocaleString("ru-RU")} ₽</p>
        <div class="cart-item-quantity">
          <button class="quantity-btn minus" data-id="${e.product.id}">-</button>
          <span>${e.quantity}</span>
          <button class="quantity-btn plus" data-id="${e.product.id}">+</button>
        </div>
      </div>
      <button class="cart-item-remove" data-id="${e.product.id}">×</button>
    </div>
  `}function ee(e){document.querySelectorAll(".quantity-btn.minus").forEach(t=>{t.addEventListener("click",a=>{const i=parseInt(a.target.getAttribute("data-id")),r=e.find(n=>n.product.id===i);r&&($(i,r.quantity-1),m(document.getElementById("main-content")))})}),document.querySelectorAll(".quantity-btn.plus").forEach(t=>{t.addEventListener("click",a=>{const i=parseInt(a.target.getAttribute("data-id")),r=e.find(n=>n.product.id===i);r&&($(i,r.quantity+1),m(document.getElementById("main-content")))})}),document.querySelectorAll(".cart-item-remove").forEach(t=>{t.addEventListener("click",a=>{const i=parseInt(a.target.getAttribute("data-id"));C(i),m(document.getElementById("main-content"))})}),document.getElementById("apply-promo")?.addEventListener("click",()=>{const t=document.getElementById("promo-input"),a=j(t.value),i=document.getElementById("promo-message");a.valid?(u=!0,i.textContent=a.message,i.className="promo-message success",m(document.getElementById("main-content"))):(i.textContent=a.message,i.className="promo-message error")})}function te(e){if(s().length===0){window.location.hash="#/cart";return}e.innerHTML=`
    <div class="checkout-page">
      <form class="checkout-form" id="checkout-form">
        <h2>Оформление заказа</h2>
        <div class="form-group">
          <label for="name">Имя</label>
          <input type="text" id="name" required>
        </div>
        <div class="form-group">
          <label for="phone">Телефон</label>
          <input type="tel" id="phone" required>
        </div>
        <div class="form-group">
          <label for="address">Адрес доставки</label>
          <input type="text" id="address" required>
        </div>
        <div class="payment-section">
          <h3>Оплата картой</h3>
          <div class="form-group">
            <label for="card-number">Номер карты</label>
            <input type="text" id="card-number" placeholder="1111 1111 1111 1111" required>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label for="card-expiry">Срок окончания</label>
              <input type="text" id="card-expiry" placeholder="12/25" required>
            </div>
            <div class="form-group">
              <label for="card-cvc">CVC</label>
              <input type="text" id="card-cvc" placeholder="123" required>
            </div>
          </div>
        </div>
        <button type="submit" class="btn-pay">Оплатить</button>
      </form>
    </div>
  `,document.getElementById("checkout-form")?.addEventListener("submit",ae)}function ae(e){if(e.preventDefault(),document.getElementById("card-number").value.replace(/\s/g,"")===M){const a=s(),i=q(),r=u?i*h:0,n=i-r,c={id:"ORD-"+Date.now(),items:a,total:n,promoApplied:u,date:new Date().toLocaleDateString("ru-RU")};J(c),H(),u=!1,window.location.hash="#/success"}else window.location.hash="#/failure"}function R(e){const t=w(),a=L(),i=I();if(!t?.isLoggedIn){e.innerHTML=`
      <div class="profile-page">
        <div class="profile-login-required">
          <h2>Для доступа к личному кабинету необходимо войти</h2>
          <button class="btn btn-primary" id="login-required-btn">Войти</button>
        </div>
      </div>
    `,document.getElementById("login-required-btn")?.addEventListener("click",N);return}e.innerHTML=`
    <div class="profile-page">
      <div class="profile-header">
        <div class="profile-avatar">👤</div>
        <div class="profile-info">
          <h2>Личный кабинет</h2>
          <p class="profile-email">${t.email}</p>
          <p class="profile-status">✓ Авторизован</p>
        </div>
      </div>
      
      <div class="profile-stats">
        <div class="profile-stat-card">
          <div class="stat-value">${a.length}</div>
          <div class="stat-label">Заказов</div>
        </div>
        <div class="profile-stat-card">
          <div class="stat-value">${i.length}</div>
          <div class="stat-label">Отзывов</div>
        </div>
        <div class="profile-stat-card">
          <div class="stat-value">${E()}</div>
          <div class="stat-label">Товаров в корзине</div>
        </div>
      </div>
      
      <div class="profile-section">
        <h3>История заказов</h3>
        ${a.length===0?'<p class="empty-message">Заказов пока нет</p>':a.map(r=>`
            <div class="order-card">
              <div class="order-header">
                <span class="order-id">${r.id}</span>
                <span class="order-date">${r.date}</span>
              </div>
              <div class="order-items">
                ${r.items.map(n=>`<span>${n.product.name} x${n.quantity}</span>`).join(", ")}
              </div>
              <div class="order-total">
                Итого: ${r.total.toLocaleString("ru-RU")} ₽
                ${r.promoApplied?'<span class="promo-badge">Промокод</span>':""}
              </div>
            </div>
          `).join("")}
      </div>
      
      <div class="profile-section">
        <h3>Мои отзывы</h3>
        ${i.length===0?'<p class="empty-message">Отзывов пока нет</p>':i.map(r=>`
            <div class="review-card">
              <div class="review-header">
                <span class="review-product">${r.productName}</span>
                <span class="review-rating">${"★".repeat(r.rating)}</span>
              </div>
              <p class="review-text">${r.text}</p>
              <p class="review-date">${r.date}</p>
            </div>
          `).join("")}
      </div>
      
      <button class="btn btn-logout" id="logout-btn">Выйти из аккаунта</button>
    </div>
  `,document.getElementById("logout-btn")?.addEventListener("click",()=>{O(),window.location.hash="#/"})}function re(e){const t=L(),a=t[t.length-1];e.innerHTML=`
    <div class="result-page success">
      <div class="result-icon">✓</div>
      <h1>Заказ успешно оплачен!</h1>
      <p class="order-number">Номер заказа: ${a?.id||"N/A"}</p>
      <a href="#/" class="btn btn-primary">Вернуться на главную</a>
    </div>
  `}function ie(e){e.innerHTML=`
    <div class="result-page failure">
      <div class="result-icon">✗</div>
      <h1>Оплата отклонена</h1>
      <p>Проверьте данные карты и попробуйте снова</p>
      <a href="#/checkout" class="btn btn-primary">Вернуться к оплате</a>
    </div>
  `}function T(e){const t=I(),i=s().map(r=>r.product);e.innerHTML=`
    <div class="reviews-page">
      <div class="review-form">
        <h2>Оставить отзыв</h2>
        <div class="form-group">
          <label for="review-product">Выберите товар</label>
          <select id="review-product">
            <option value="">Выберите товар...</option>
            ${i.map(r=>`<option value="${r.id}">${r.name}</option>`).join("")}
          </select>
        </div>
        <div class="form-group">
          <label>Оценка</label>
          <div class="rating-select" id="rating-select">
            <span class="rating-star" data-rating="1">★</span>
            <span class="rating-star" data-rating="2">★</span>
            <span class="rating-star" data-rating="3">★</span>
            <span class="rating-star" data-rating="4">★</span>
            <span class="rating-star" data-rating="5">★</span>
          </div>
        </div>
        <div class="form-group">
          <label for="review-text">Текст отзыва</label>
          <textarea id="review-text" rows="4" style="width: 100%; padding: 0.75rem; border-radius: 8px; border: 1px solid #374151; background: #16213e; color: #eaeaea; font-size: 1rem;"></textarea>
        </div>
        <button class="btn btn-primary" id="submit-review">Отправить отзыв</button>
      </div>
      <h2>Отзывы</h2>
      <div class="reviews-list">
        ${t.length===0?"<p>Отзывов пока нет</p>":t.map(ne).join("")}
      </div>
    </div>
  `,oe()}function ne(e){return`
    <div class="review-card">
      <div class="review-header">
        <span class="review-product">${e.productName}</span>
        <span class="review-rating">${"★".repeat(e.rating)}${"☆".repeat(5-e.rating)}</span>
      </div>
      <p class="review-text">${e.text}</p>
      <p class="review-date">${e.date}</p>
    </div>
  `}function oe(){document.querySelectorAll(".rating-star").forEach(t=>{t.addEventListener("click",a=>{f=parseInt(a.target.getAttribute("data-rating")),se()})}),document.getElementById("submit-review")?.addEventListener("click",()=>{const t=document.getElementById("review-product"),a=document.getElementById("review-text").value,i=parseInt(t.value);if(!i||!a||f===0){alert("Пожалуйста, заполните все поля");return}const n=s().find(c=>c.product.id===i)?.product;if(!n){alert("Товар не найден в заказе");return}F({productId:i,productName:n.name,rating:f,text:a}),alert("Отзыв отправлен!"),T(document.getElementById("main-content"))})}function se(){document.querySelectorAll(".rating-star").forEach((t,a)=>{a<f?t.classList.add("active"):t.classList.remove("active")})}W();
//# sourceMappingURL=index-BLa9dCMi.js.map
