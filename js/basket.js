/* зчитування даних */
let ul = document.getElementById('product-cards');

document.addEventListener('DOMContentLoaded', function() {
    let products = JSON.parse(localStorage.getItem('cart')) || [];

    for (const product of products) {
        ul.innerHTML += `
            <li class="product-card">
                <div class="product-card-content">
                    <div class="product-card-wrap">
                        <img src="${product.image}" alt="" class="card__img">
                        <div class="product-card-title">
                            <p class="product-card-title__name">${product.name}</p>
                            <p class="card__waight">${product.waight}</p>
                        </div>
                        <div class="card__price">
                            <p class="price-number" data-base-price="${product.price}">${product.price}</p>
                            <p>грн</p>
                        </div>
                    </div>
                    <div class="product-card-btn">
                        <div class="basket-product__counter">
                            <button class="counter-minus">-</button>
                            <p class="counter-num">1</p>
                            <button class="counter-plus">+</button>
                        </div>
                    </div>
                </div>
            </li>
        `;
    }

    /* кінцева ціна */
    function updateTotalPrice() {
        let productPrices = document.getElementsByClassName('price-number');
        let totalPrice = 0;

        for (const price of productPrices) {
            totalPrice += parseInt(price.textContent); // Перетворюємо текст на ціле число і додаємо до загальної суми
        }

        let totalPriceTitle = document.getElementById('final-cost__title');
        totalPriceTitle.innerText = `Всього: ${totalPrice} грн`;

        /* Оновлення повідомлення про вартість доставки */
        let delivery = document.getElementById('delivery');
        delivery.innerHTML = '';  // Очищуємо вміст перед оновленням

        if (totalPrice >= 500) {
            delivery.innerHTML = `
                <img src="./img/basket-img/delivery.png" alt="delivery" class="delivery__logo">
                <p class="delivery__price">Безкоштовна доставка</p>
            `;
        } else if (totalPrice > 0) {
            delivery.innerHTML = `
                <img src="./img/basket-img/delivery.png" alt="delivery" class="delivery__logo">
                <p class="delivery__price">доставка: 100 грн</p>
            `;
        } else {
            delivery.innerHTML = `
                <img src="./img/basket-img/delivery.png" alt="delivery" class="delivery__logo">
                <p class="delivery__price">доставка: 0 грн</p>
            `;
        }
    }
    updateTotalPrice();

    /* реалізація лічильника для додавання та віднімання кількості продуктів */
    let countersMinus = document.getElementsByClassName('counter-minus');
    let countersPlus = document.getElementsByClassName('counter-plus');

    for (const counterMinus of countersMinus) {
        counterMinus.addEventListener('click', function () {
            let productCard = counterMinus.closest('.product-card');
            let counterNum = productCard.querySelector('.counter-num');
            let productPrice = productCard.querySelector('.price-number');

            let count = parseInt(counterNum.innerText);

            if (count >= 1) {
                count -= 1;
                counterNum.innerText = count;

                let basePrice = parseInt(productPrice.dataset.basePrice);
                let newProductPrice = basePrice * count;
                productPrice.innerText = newProductPrice;

                updateTotalPrice();
            }
        });
    }

    for (const counter of countersPlus) {
        counter.addEventListener('click', function () {
            let productCard = counter.closest('.product-card');
            let counterNum = productCard.querySelector('.counter-num');
            let productPrice = productCard.querySelector('.price-number');

            let count = parseInt(counterNum.innerText);
            count += 1;
            counterNum.innerText = count;

            let basePrice = parseInt(productPrice.dataset.basePrice);
            let newProductPrice = basePrice * count;
            productPrice.innerText = newProductPrice;

            updateTotalPrice();
        })
    }
});

/* Варіанти оформлення доставки (самовивіз чи доставка) */
const radioSelfPickup = document.getElementById('radio-self-pickup');
const radioDelivery = document.getElementById('radio-delivery');
const additionalBlock = document.getElementById('additional');

function radioClickClose(event) {
    additionalBlock.innerHTML = '';
}
function radioClickOpen(event) {
    additionalBlock.innerHTML += `
        <input type="text" placeholder="Вулиця, дім, квартира" class="form__input-text" name="street">
        <div class="input-delivery-wrap">
            <input type="number" placeholder="Поверх" class="delivery-input" name="floor">
            <input type="number" placeholder="Домофон" class="delivery-input" name="intercom">
        </div>
    `;
}

radioSelfPickup.addEventListener('click', radioClickClose);
radioDelivery.addEventListener('click', radioClickOpen);



