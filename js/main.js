/* box shadow scroll */

function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

const handleScroll = debounce(function() {
    const nav = document.getElementById('nav');
    const sticky = nav.offsetTop;

    if (window.pageYOffset > sticky) {
        nav.classList.add('box-shadow');
    } else {
        nav.classList.remove('box-shadow');
    }
}, 100); // затримка в 100 мс

window.addEventListener('scroll', handleScroll);

/* Додавання продуктів у корзину */
let addBtn = document.getElementsByClassName('card__btn');
for (let btn of addBtn) {
    btn.addEventListener('click', function() {
        console.log('click');

        let card = btn.closest('.card');

        // Отримуємо назву, ціну та шлях до зображення продукту
        let name = card.querySelector('.card__name').innerText;
        let waight = card.querySelector('.card__waight').innerText;
        let price = card.querySelector('.card__price').innerText;
        let image = card.querySelector('.card__img').src;

        let product = {
            name: name,
            price: price,
            waight: waight,
            image: image
        }

        // Отримуємо поточний масив продуктів з локального сховища
        let products = JSON.parse(localStorage.getItem('cart')) || [];
        products.push(product);
        localStorage.setItem('cart', JSON.stringify(products));
    });

}

localStorage.clear()










